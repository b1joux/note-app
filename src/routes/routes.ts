import express from 'express';
import noteController from '../controllers/noteController';
import StorageHelper from '../helpers/storageHelper';

const router = express.Router();

const init = (storageHelper: StorageHelper) => {
  router.use('/notes', noteController(storageHelper));
  return router;
};

export default init;
