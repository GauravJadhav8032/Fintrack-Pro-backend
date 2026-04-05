const { ZodError } = require("zod");

function errorHandler(err, _req, res, _next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: err.issues.map((issue) => issue.message).join(", "),
    });
  }

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON payload",
    });
  }

  if (err?.name === "PrismaClientKnownRequestError") {
    if (err.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    if (err.code === "P2002") {
      return res.status(400).json({
        success: false,
        message: "Duplicate value violates a unique constraint",
      });
    }
  }

  const statusCode = err.statusCode === 409 ? 400 : err.statusCode || 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = errorHandler;
