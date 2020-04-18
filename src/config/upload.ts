import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename: (request, file, callback) => {
      const filenameHash = crypto.randomBytes(8).toString('hex');
      const filename = `${filenameHash}-${file.originalname}`;
      callback(null, filename);
    },
  }),
};
