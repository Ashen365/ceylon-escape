require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const morgan = require("morgan");
const Sentry = require("@sentry/node");

const app = express();
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const setupSwagger = require('./swagger');

// Sentry initialization (must be first)
Sentry.init({ dsn: process.env.SENTRY_DSN || "" }); // Use "" fallback if DSN is not set

// The request handler must be the first middleware on the app
if (Sentry.Handlers && typeof Sentry.Handlers.requestHandler === "function") {
  app.use(Sentry.Handlers.requestHandler());
}

// Logging middleware
app.use(morgan('dev'));

// Swagger setup
setupSwagger(app);

// For handling JSON requests (except for webhooks)
app.use(express.json());

/**
 * @swagger
 * /api/bookings/webhook:
 *   post:
 *     summary: Stripe webhook endpoint
 *     description: Receives Stripe webhook events (raw body required for signature verification).
 *     responses:
 *       200:
 *         description: Webhook received successfully
 */
app.post("/api/bookings/webhook", bodyParser.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // TODO: Mark the booking as paid in your database
    console.log("Payment received for session:", session.id);
  }

  res.status(200).json({ received: true });
});

/**
 * @swagger
 * /create-checkout-session:
 *   post:
 *     summary: Create a Stripe Checkout session
 *     description: Starts a new Stripe Checkout session for payment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Example Booking
 *               amount:
 *                 type: integer
 *                 minimum: 100
 *                 example: 2000
 *     responses:
 *       200:
 *         description: URL to Stripe Checkout session
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
app.post(
  "/create-checkout-session",
  [
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("amount").isInt({ min: 100 }).withMessage("Amount must be at least 100 (i.e. $1.00)"),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next({ status: 400, errors: errors.array() });
    }

    try {
      const { name, amount } = req.body;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: name,
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      });
      res.json({ url: session.url });
    } catch (error) {
      next(error);
    }
  }
);

// Sentry error handler (must be before any other error handlers)
if (Sentry.Handlers && typeof Sentry.Handlers.errorHandler === "function") {
  app.use(Sentry.Handlers.errorHandler());
}

// Centralized error handler middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (err.errors) {
    // Validation error
    return res.status(status).json({
      status: "error",
      errors: err.errors,
    });
  }
  // General error
  res.status(status).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));