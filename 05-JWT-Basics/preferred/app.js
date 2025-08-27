require('dotenv').config();
require('express-async-errors');

const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

const authRouter = require('./routes/auth');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

app.use(express.json());

app.use('/api/v1', authRouter);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Successfully started server port : ${PORT}...`);
});