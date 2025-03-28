import { Router } from 'express';
import { getFoldersByParent, createFolder } from '../controllers/folders.controller';

const router = Router();

router.get('/folders/:parentId?', getFoldersByParent); // Lista carpetas hijas
router.post('/folders', createFolder); // Crea carpeta

export default router;
