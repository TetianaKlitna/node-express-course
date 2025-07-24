const express = require('express');
const logger = require('./logger');
const app = express();
const { products, people } = require('./data');

app.use(['/api/v1/products', '/api/v1/query'], logger);
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api/v1/test', logger, (req, res) => {
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

app.get('/api/v1/people', (req, res) => {
  res.status(200).json(people);
});

app.post('/api/v1/people', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide a name' });
  }
  people.push({ id: people.length + 1, name: req.body.name });
  res.status(201).json({ success: true, name: req.body.name });
});

app.all('/{*any}', (req, res) => {
  res.status(404).send('resource not found');
});

app.listen(3000, () => {
  console.log('Server is listening port 3000...');
});
