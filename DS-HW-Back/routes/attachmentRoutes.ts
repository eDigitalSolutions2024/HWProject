import { Router } from 'express';
import { param } from 'express-validator';
import { validationFields } from '@middlewares/validation-fields';
import downloadAttachmentController from '../controllers/attachments/download.attachment';
import { getFilesByFolderController } from '../controllers/attachments';
import getAttachmentsByFolderCCA from '../controllers/attachments/getAttachmentsByFolderCCA';
import uploadAttachmentCCA from '../controllers/attachments/uploadAttachmentCCA';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../assets'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

const router = Router();

// ✅ Ruta de descarga
router.get('/:fileId/download', [
  param('fileId', 'El ID del archivo es requerido').isMongoId().notEmpty(),
  validationFields,
], downloadAttachmentController);


router.get('/cca/:fileId/download', [
  param('fileId', 'El ID del archivo es requerido').isMongoId().notEmpty(),
  validationFields,
], downloadAttachmentController); // puedes usar el mismo controlador si lee bien desde AttachmentCCA

// ✅ Ruta para archivos del sistema anterior (si la usas aún)
router.get('/legacy/folder/:folderId', getFilesByFolderController);


// Ruta real esperada por el frontend: /api/attachments/folder/:folderId
router.get('/folder/:folderId', getAttachmentsByFolderCCA);


// ✅ Ruta de subida de archivos CCA
router.post('/cca/upload', upload.single('file'), uploadAttachmentCCA);

export default router;
