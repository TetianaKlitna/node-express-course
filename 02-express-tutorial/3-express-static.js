const express = require('express');
const app = express();

app.use(express.static('./methods-public'));

app.all('/{*any}', (req, res, next) => {
  res.status(404).send('resource not found');
});

app.listen(5000, () => {
  console.log('Server is listening port 5000...');
});
