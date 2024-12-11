const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description of my API',
  },
  host: 'localhost:8080', // Change this to your actual host if needed
  schemes: ['http'], // You can change this to ['https'] if your API uses HTTPS
};

const outputFile = './swagger-output.json'; // Output file for the generated Swagger documentation
const endpointsFiles = ['./routes/index.js']; // Path to your route files

// Generate the Swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully');
});
