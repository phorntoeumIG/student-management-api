class ValidationError extends Error {
  constructor(message, errors) {
    super(message || "Validation failed");
    this.name = "ValidationError";
    this.statusCode = 400;
    this.errors = errors;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message || "Unauthorized");
    this.name = "UnauthorizedError";
    this.statusCode = 401;
  }
}

class ResourceNotFound extends Error {
  constructor(resourceName, resourceId) {
    super(`Resource ${resourceName} with identifier ${resourceId} not found.`);
    this.name = "ResourceNotFound";
    this.statusCode = 404;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message || "Forbidden");
    this.name = "ForbiddenError";
    this.statusCode = 403;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message || "Conflict");
    this.name = "ConflictError";
    this.statusCode = 409;
  }
}

class RateLimitExceeded extends Error {
  constructor(message) {
    super(message || "Rate limit exceeded");
    this.name = "RateLimitExceeded";
    this.statusCode = 429;
  }
}

module.exports = {
  ResourceNotFound,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  RateLimitExceeded,
};
