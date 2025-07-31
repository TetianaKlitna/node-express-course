const logger = (req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] INFO - ${method} ${url}`);
  next();
};

module.exports = logger;
