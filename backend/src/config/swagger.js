const swaggerJSDoc = require("swagger-jsdoc");

function resolveServerUrl() {
  const rawUrl =
    process.env.PUBLIC_API_URL ||
    process.env.RENDER_EXTERNAL_URL ||
    `http://localhost:${process.env.PORT || 3000}`;

  return String(rawUrl).replace(/\/$/, "");
}

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "FinTrack Pro API",
      version: "1.0.0",
      description: "Finance Backend API Documentation",
    },
    servers: [
      {
        url: resolveServerUrl(),
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        SuccessBase: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Error message",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            name: { type: "string", example: "Admin User" },
            email: { type: "string", format: "email", example: "admin@fintrack.local" },
            role: { type: "string", enum: ["admin", "analyst", "viewer"] },
            status: { type: "string", enum: ["active", "inactive"] },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Record: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            userId: { type: "string", format: "uuid" },
            amount: { type: "number", example: 2500.75 },
            type: { type: "string", enum: ["income", "expense"] },
            category: { type: "string", example: "salary" },
            date: { type: "string", format: "date-time" },
            note: { type: "string", nullable: true, example: "April salary" },
            isDeleted: { type: "boolean", example: false },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
