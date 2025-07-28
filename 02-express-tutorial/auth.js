const auth = (req, res, next) => {
  const name = req.cookies.name;
  if (!name) {
    return res.status(401).send({ success: false, message: 'unauthorized' });
  }
  req.user = name;
  next();
};

module.exports = auth;
