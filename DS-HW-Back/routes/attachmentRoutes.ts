import { Router, RequestHandler } from 'express';
import { param } from 'express-validator';
import { validationFields } from '@middlewares/validation-fields';
import downloadAttachmentController from '../controllers/attachments/download.attachment';

const router = Router();

router.get('/:fileId/download', [
  param('fileId', 'El ID del archivo es requerido').isMongoId().notEmpty(),
  validationFields,
] as RequestHandler[], downloadAttachmentController);

export default router;
