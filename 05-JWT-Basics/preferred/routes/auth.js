const express = require('express');
const authRouter = express.Router();
const requireAuth = require('../middleware/auth');
const { logon, hello } = require('../controllers/auth');

authRouter.route('/logon').post(logon);
authRouter.route('/hello').get(requireAuth, hello);

module.exports = authRouter;
