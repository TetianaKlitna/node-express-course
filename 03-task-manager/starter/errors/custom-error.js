class CustomAPIError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (statusCode, message) =>
  new CustomAPIError(statusCode, message);

module.exports = { createCustomError, CustomAPIError };
