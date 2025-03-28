import { Router } from 'express';
import { param } from 'express-validator';
import { validationFields } from '@middlewares/validation-fields';
import downloadAttachmentController from '../controllers/attachments/download.attachment';
import { getFilesByFolderController } from '../controllers/attachments';


const router = Router();

router.get('/:fileId/download', [
  param('fileId', 'El ID del archivo es requerido').isMongoId().notEmpty(),
  validationFields,
], downloadAttachmentController);

// NUEVA RUTA
router.get('/folder/:folderId', getFilesByFolderController); // 👈 esta es la que faltaba

export default router;
