const express = require('express');
const app = express();
const { products } = require('./data');

app.use(express.static('./public'));

app.get('/api/v1/test', (req, res) => {
  res.status(200).json({ message: 'It worked!' });
});

app.get('/api/v1/products', (req, res) => {
  res.status(200).json(products);
});

app.get('/api/v1/products/:productID', (req, res) => {
  //res.status(200).json(req.params);
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);
  if (!product) {
    res.status(404).json({ message: 'That product was not found.' });
  }
  res.status(200).json(product);
});

app.get('/api/v1/query', (req, res) => {
  const { search, limit } = req.query;
  let filtered = [...products];
  if (search) {
    filtered = filtered.filter((product) => product.name.startsWith(search));
  }
  if (limit) {
    filtered = filtered.slice(0, limit);
  }
  if (filtered.length < 1) {
    return res
      .status(404)
      .json({ message: 'No products matched your search.' });
  }
  res.status(200).json(filtered);
});

app.all('/{*any}', (req, res) => {
  res.status(404).send('resource not found');
});

app.listen(3000, () => {
  console.log('Server is listening port 3000...');
});
