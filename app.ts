import express from 'express';
import routes from './src/routes/routes';
import StorageHelper from './src/helpers/storageHelper';
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const app = express();
const PORT = 3000;
const STORAGE_PATH = './storage';

async function init() {
  const storageHelper = new StorageHelper(STORAGE_PATH);
  await storageHelper.initializeStoragePath();
  app.use(jsonParser);
  app.use(routes(storageHelper));
  await app.listen(PORT);
  console.log(`Server running on port: ${PORT}`);
}

init().catch((error) => console.error(error));
