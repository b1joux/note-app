import express from 'express';
import ResponseHelper from '../helpers/responseHelper';
import StorageHelper from '../helpers/storageHelper';
import Validate from '../models/validate';
const router = express.Router();

const controller = (storageHelper: StorageHelper) => {
  // GET all notes
  router.get('', async (req: any, res: any) => {
    try {
      const data = await storageHelper.readAllFiles();
      ResponseHelper.sendResponse(res, 200, data);
    } catch (error) {
      console.error(error);
      ResponseHelper.sendErrorResponse(res, error);
    }
  });

  // GET note by ID
  router.get('/:id', async (req: any, res: any) => {
    try {
      const { id } = req.params;
      await Validate.noteExists(id, storageHelper);

      const data = await storageHelper.readFile(id);
      ResponseHelper.sendResponse(res, 200, data);
    } catch (error) {
      console.error(error);
      ResponseHelper.sendErrorResponse(res, error);
    }
  });

  // Create note
  router.post('', async (req: any, res: any) => {
    try {
      await Validate.createNote(req);
      const id = await storageHelper.writeFile(req.body);
      ResponseHelper.sendResponse(res, 200, `Successfully created note: ${id}`);
    } catch (error) {
      console.error(error);
      ResponseHelper.sendErrorResponse(res, error);
    }
  });

  // Update note
  router.put('/:id', async (req: any, res: any) => {
    try {
      const { id } = req.params;
      await Validate.noteExists(id, storageHelper);
      await Validate.updateNote(req);
      // extra validations
      const currentData = await storageHelper.readFile(id);
      const updatedData = {
        title: req.body.title ? req.body.title : currentData.title,
        body: req.body.body ? req.body.body : currentData.body,
      };
      await storageHelper.writeFile(updatedData, id);
      ResponseHelper.sendResponse(res, 200, `Successfully updated note: ${id}`);
    } catch (error) {
      console.error(error);
      ResponseHelper.sendErrorResponse(res, error);
    }
  });

  // Delete note
  router.delete('/:id', async (req: any, res: any) => {
    try {
      const { id } = req.params;
      await Validate.noteExists(id, storageHelper);
      await storageHelper.deleteFile(id);
      ResponseHelper.sendResponse(res, 200, `Successfully deleted note: ${id}`);
    } catch (error) {
      console.error(error);
      ResponseHelper.sendErrorResponse(res, error);
    }
  });

  return router;
};

export default controller;
