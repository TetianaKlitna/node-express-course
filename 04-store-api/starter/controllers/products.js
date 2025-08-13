const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort('-name price');
  res.status(200).json({ products, len: products.length });
};

const getAllProducts = async (req, res) => {
  const queryObj = {};
  const { featured, company, name, sort } = req.query;
  if (featured) {
    queryObj.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObj.company = company;
  }
  if (name) {
    queryObj.name = { $regex: name, $options: 'i' };
  }
  let result = Product.find(queryObj);
  if (sort) {
    const sortList = sort
      .split(',')
      .map((item) => item.trim())
      .join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }
  const products = await result;
  res.status(200).json({ products, len: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
