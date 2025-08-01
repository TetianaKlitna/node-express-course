const dotenv = require('dotenv');
const appEnv = {};
dotenv.config({ path: '.env', processEnv: appEnv });

module.exports = appEnv;
