require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');

//routers
const productsRouter = require('./routes/products');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>');
});

app.use('/api/v1/products', productsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => { console.log(`Server is listening ${PORT} port...`); });
  } catch (error) {
    console.log(error);
  }
};
start();
