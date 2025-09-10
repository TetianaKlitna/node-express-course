const { StatusCodes } = require('http-status-codes');
const { CustomAPIError } = require('../errors');

const errorHandler = (error, req, res, next) => {
  console.error(error);
  if (error instanceof CustomAPIError) {
    return res.status(error.statusCode).json({ msg: error.message });
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: error.message });
};

module.exports = errorHandler;
