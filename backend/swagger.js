const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Booking & Payments API',
      version: '1.0.0',
      description: 'API documentation for your booking and Stripe integration backend',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Ensure this matches your server's running port
        description: 'Local server'
      },
    ],
  },
  // If you add endpoints in other files, add them here (e.g., './routes/*.js')
  apis: ['./server.js'],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;