class ValidationError extends Error {
  constructor(message) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }

    this.message = message;
    this.status = 400;
  }
}

module.exports = {
  ValidationError,
};
