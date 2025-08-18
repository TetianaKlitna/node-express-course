const appEnv = require('./config/env');
const connectDB = require('./db/connect');
const express = require('express');
const notFound = require('./middleware/not-found');
const errorsHandlerMiddleware = require('./middleware/error-handler');
const routerTasks = require('./routes/tasks');
const app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/v1/tasks', routerTasks);
app.use(notFound);
app.use(errorsHandlerMiddleware);

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
