import { Router } from 'express';
import { getFoldersByParent, createFolder, deleteFolder } from '../controllers/folder/folders.controller';
import upload from '../middlewares/upload'; // si usas multer
import { uploadFileToFolder } from '../controllers/folder/folders.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

import uploadAttachmentCCA from '../controllers/attachments/uploadAttachmentCCA';




const router = Router();

router.get('/:parentId?', getFoldersByParent); // <- ya existente
router.post('/', createFolder);                // <- ya existente
router.delete('/:id', deleteFolder);           // <- ✅ ESTA ES LA QUE FALTA

// routes/folders.ts
router.post('/upload', upload.single('file'), uploadFileToFolder); // sin authMiddleware

router.post('/upload', upload.single('file'), uploadAttachmentCCA);




export default router;
