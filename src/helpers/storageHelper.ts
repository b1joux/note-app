import fs from 'node:fs/promises';
const { v4: uuidv4 } = require('uuid');

class StorageHelper {
  _resourcePath: string = '';

  constructor(resourcePath: string) {
    this._resourcePath = resourcePath;
  }

  initializeStoragePath = async () => {
    try {
      await fs.mkdir(this._resourcePath);
    } catch (error: any) {
      if (error.code === 'EEXIST') {
        console.log('path exists, skipping creation of directory');
      }
    }
  };

  writeFile: any = async (content: Object, id: any) => {
    try {
      const fileId = id ? id : uuidv4();
      await fs.writeFile(
        `${this._resourcePath}/${fileId}`,
        JSON.stringify(content)
      );
      return fileId;
    } catch (error) {
      throw error;
    }
  };

  readFile: any = async (id: any) => {
    try {
      const fileData = await fs.readFile(`${this._resourcePath}/${id}`, 'utf8');
      return {
        id,
        ...JSON.parse(fileData),
      };
    } catch (error) {
      throw error;
    }
  };

  readAllFiles: any = async () => {
    try {
      const dataArray = [];
      const fileNames = await fs.readdir(this._resourcePath);
      for (let i = 0; i < fileNames.length; i++) {
        const id = fileNames[i];
        const fileData = await this.readFile(id);
        dataArray.push(fileData);
      }
      return dataArray;
    } catch (error) {
      throw error;
    }
  };

  deleteFile: any = async (id: any) => {
    try {
      await fs.unlink(`${this._resourcePath}/${id}`);
      return id;
    } catch (error) {
      throw error;
    }
  };

  fileExists: any = async (id: any) => {
    try {
      await fs.access(`${this._resourcePath}/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  };
}

export default StorageHelper;
