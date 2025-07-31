const express = require('express');
const routerTasks = require('./routes/tasks');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1/tasks', routerTasks);

app.all('/*', (req, res) => {
  res.status(404).send('resource not found');
});

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}...`);
});
