# Ceylon Escape - Backend

This is the backend for **Ceylon Escape**, a tour booking and payment platform built with Node.js, Express, and MongoDB. It supports booking management, reviews, user authentication, Stripe payments, and email notifications.

---

## Features

- **User Authentication**: Register & login with JWT-based authentication.
- **Tour Management**: CRUD operations for tours.
- **Booking System**: Book tours and manage bookings.
- **Payment Integration**: Secure payments using Stripe.
- **Reviews**: Leave and manage reviews for tours.
- **Email Notifications**: Sends confirmation and update emails (Ethereal for development).
- **API Documentation**: Interactive Swagger UI.
- **Error Handling & Logging**: Robust error handling and request logging.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Ashen365/ceylon-escape.git
cd ceylon-escape/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

- Copy `.env.example` to `.env` and fill in your secrets:

```bash
cp .env.example .env
```

- Set the required environment variables in `.env`:
  - `PORT`
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `EMAIL_*` (see `.env.example`)

> **Never commit your real `.env` file! It is already gitignored.**

### 4. Run the Server

```bash
npm start
```

- The server should start on your specified `PORT` (default is 5000).

---

## API Documentation

- Visit [http://localhost:5000/api-docs](http://localhost:5000/api-docs) for interactive Swagger UI once the server is running.

---

## Project Structure

```
backend/
  ├── models/         # Mongoose models (User, Tour, Booking, Review)
  ├── routes/         # Express route handlers
  ├── controllers/    # Business logic (optional, if separated)
  ├── mailer.js       # Email sending logic
  ├── server.js       # Entry point
  ├── swagger.js      # Swagger setup
  ├── .env.example    # Example environment variables
  ├── .gitignore
  └── package.json
frontend/

```

---

## Development Notes

- **Ethereal Email** is used for local testing of emails. Change to a real SMTP provider for production.
- **Stripe** is used for handling payments. Use test keys in development.
- **MongoDB Atlas** or local MongoDB for database.
- Detailed logging via [Morgan](https://www.npmjs.com/package/morgan).
- Error handling middleware included.

---

## Deployment

- Use environment variables for all secrets in production.
- Set up a production-ready database and email provider.
- Make sure to configure Stripe with live keys for real payments.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## Contact

For any questions, contact [Ashen365](https://github.com/Ashen365).
# ceylon-escape
Ceylon Escape is a travel platform for couples to explore Sri Lanka’s beauty with ease. It offers tour packages, activity bookings, guide management, and itinerary planning—all in one place—making romantic getaways simple, personalized, and unforgettable.
