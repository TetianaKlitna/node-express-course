const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $lt: 30 } }).select('name price').sort('name');
  res.status(200).json({ products, len: products.length });
};

const getAllProducts = async (req, res) => {
  const queryObj = {};
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  if (featured) {
    queryObj.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObj.company = company;
  }
  if (name) {
    queryObj.name = { $regex: name, $options: 'i' };
  }
  //Numeric Filtersi
  if(numericFilters){
    const operatorMap = {
       '>': '$gt',
       '>=': '$gte',
       '<': '$lt',
       '<=': '$lte',
       '=': '$eq',
    };
    const regEx = /\b(>|>=|<|<=|=)\b/g;
    let filters = numericFilters.replace(regEx, match => `-${operatorMap[match]}-`);
    console.log(filters);
    const options = [ 'price', 'rating' ];
    filters = filters
      .split(',')
      .forEach(element => {
        let [field, operator, value] = element.split('-');
        field = field.trim();
        if(options.includes(field)){
          queryObj[field] = { [operator]: Number(value) };
        }
      });
    ;
  }
  let result = Product.find(queryObj);
  //sort
  if (sort) {
    const sortList = sort
      .split(',')
      .map((item) => item.trim())
      .join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }
  //select fields
  if (fields) {
    const fieldsList = fields
      .split(',')
      .map((item) => item.trim())
      .join(' ');
    result = result.select(fieldsList);
  }
  //pagination 
  const currPage = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (currPage - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, len: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
