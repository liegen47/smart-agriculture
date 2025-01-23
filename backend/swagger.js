const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Smart Agriculture Management System API",
    version: "1.0.0",
    description:
      "API documentation for the Smart Agriculture Management System",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development Server",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Field: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Unique identifier for the field",
            example: "63d4537f9d3e3a6e2d5a8b2b",
          },
          name: {
            type: "string",
            description: "Name of the field",
            example: "Field 1",
          },
          location: {
            type: "object",
            description: "Geographical location of the field",
            properties: {
              latitude: {
                type: "number",
                description: "Latitude of the field",
                example: 28.7041,
              },
              longitude: {
                type: "number",
                description: "Longitude of the field",
                example: 77.1025,
              },
            },
          },
          cropType: {
            type: "string",
            description: "Type of crop grown in the field",
            example: "Wheat",
          },
          areaSize: {
            type: "number",
            description: "Size of the field in acres",
            example: 5.2,
          },
          user: {
            type: "string",
            description: "ID of the user who owns the field",
            example: "63d4537f9d3e3a6e2d5a8b2a",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "Timestamp when the field was created",
            example: "2025-01-22T10:30:45.123Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "Timestamp when the field was last updated",
            example: "2025-01-22T10:30:45.123Z",
          },
        },
      },
      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Unique identifier for the user",
            example: "63d4537f9d3e3a6e2d5a8b2a",
          },
          name: {
            type: "string",
            description: "Full name of the user",
            example: "John Doe",
          },
          email: {
            type: "string",
            description: "Email address of the user",
            example: "johndoe@example.com",
          },
          role: {
            type: "string",
            description: "Role of the user (e.g., Admin, Farmer)",
            example: "Farmer",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "Timestamp when the user account was created",
            example: "2025-01-22T10:30:45.123Z",
          },
        },
      },
    },
  },

  security: [
    {
      BearerAuth: [],
    },
  ],
};

// Options for Swagger JSDoc
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
