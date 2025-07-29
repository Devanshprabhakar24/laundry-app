class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Capture stack trace (optional but helpful in debugging)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorResponse;
