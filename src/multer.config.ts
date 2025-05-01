import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const fileExtension = extname(file.originalname);
      const fileName = `${Date.now()}${fileExtension}`;
      console.log(fileName, 122, fileExtension);
      callback(null, fileName); 
    },
  }),
  fileFilter: (req, file, callback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return callback(new Error('Only image files are allowed'), false);
    }
    callback(null, true);
  },
};