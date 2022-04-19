class ServerError extends Error {
  constructor(message, code) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerError);
    }

    this.message = message;
    this.status = code || 500;
    this.expose = true;
  }
}

module.exports = {
  ServerError,
};
