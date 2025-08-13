const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).select('name price').limit(3);
  res.status(200).json({ products, len: products.length });
};

const getAllProducts = async (req, res) => {
  const queryObj = {};
  const { featured, company, name, sort, fields } = req.query;
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
  if (fields) {
    const fieldsList = fields
      .split(',')
      .map((item) => item.trim())
      .join(' ');
    result = result.select(fieldsList);
  }
  const products = await result;
  res.status(200).json({ products, len: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
