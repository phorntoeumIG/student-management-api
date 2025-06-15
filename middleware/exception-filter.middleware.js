module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.setHeader("Content-Type", "application/json");

  const errorResponse = {
    statusCode: err.name || "InternalError",
    message: err.message || "Internal Server Error",
    status: err.statusCode || 500,
    ...(err.details && { details: err.details }),
  };

  switch (err.name) {
    case "ResourceNotFound":
      errorResponse.status = 404;
      break;

    case "ValidationError":
      errorResponse.status = 400;
      errorResponse.details = err.errors;
      break;

    case "UnauthorizedError":
      errorResponse.status = 401;
      break;

    case "ForbiddenError":
      errorResponse.status = 403;
      break;

    case "ConflictError":
      errorResponse.status = 409;
      break;

    case "RateLimitExceeded":
      errorResponse.status = 429;
      res.set("Retry-After", err.retryAfter || 60);
      break;

    default:
      console.error(`[${new Date().toISOString()}] Unhandled Error:`, err);
      errorResponse.message = "Internal Server Error";
      errorResponse.status = 500;
      if (err.errorId) {
        errorResponse.errorId = err.errorId;
      }
      break;
  }

  return res.status(errorResponse.status).json(errorResponse);
};
