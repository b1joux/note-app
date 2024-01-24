import StorageHelper from '../helpers/storageHelper';

class Validate {
  static createNote = async (req: any) => {
    const { title, body } = req.body;
    if (!title || !body) {
      throw {
        status: 400,
        message: 'Missing or invalid fields: title, body',
      };
    }
  };

  static updateNote = async (req: any) => {
    const { title, body } = req.body;
    if (!title && !body) {
      throw {
        status: 400,
        message: 'Missing or invalid fields: title, body',
      };
    }
  };

  static noteExists = async (id: any, storageHelper: StorageHelper) => {
    const exists = await storageHelper.fileExists(id);
    if (!exists) {
      throw {
        status: 400,
        message: 'Note does not exist',
      };
    }
  };
}

export default Validate;
