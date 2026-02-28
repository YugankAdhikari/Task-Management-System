const swaggerJsdoc = require("swagger-jsdoc")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PrimeTrade Backend API",
      version: "1.0.0",
      description: "REST API with Authentication and Role-Based Access"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./src/routes/*.js"]
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec