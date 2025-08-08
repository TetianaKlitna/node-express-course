const appEnv = require('./config/env');
const connectDB = require('./db/connect');

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const routerTasks = require('./routes/tasks');
app.use('/api/v1/tasks', routerTasks);

app.all('*', (req, res) => {
  res.status(404).send('resource not found');
});

const start = async () => {
  try {
    await connectDB(appEnv.MONGO_URI);
    app.listen(appEnv.PORT, () => {
      console.log(`Listening port ${appEnv.PORT}...`);
    });
  } catch (error) {
    console.error(`Error during start: ${error}`);
  }
};

start();
