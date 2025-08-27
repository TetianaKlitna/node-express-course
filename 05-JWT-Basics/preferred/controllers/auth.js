const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const jwt = require('jsonwebtoken');

const logon = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    throw new BadRequestError('Please provide name and password');
  }
  const id = new Date().getTime();
  const token = jwt.sign({ id, username:name }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  res.status(StatusCodes.OK).json({ msg: 'User created', token });
};

const hello = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: `Hello, ${req.user.name}!` });
};

module.exports = { logon, hello };
