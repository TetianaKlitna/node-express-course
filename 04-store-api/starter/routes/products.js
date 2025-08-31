const express = require('express');
const productsRouter = express.Router();
const {
  getAllProductsStatic,
  getAllProducts,
} = require('../controllers/products');

productsRouter.route('/').get(getAllProducts);
productsRouter.route('/static').get(getAllProductsStatic)

module.exports = productsRouter;