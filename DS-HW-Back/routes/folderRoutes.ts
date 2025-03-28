import { Router } from 'express';
import { getFoldersByParent, createFolder, deleteFolder } from '../controllers/folder/folders.controller';
import upload from '../middlewares/upload'; // si usas multer
import { uploadFileToFolder } from '../controllers/folder/folders.controller';



const router = Router();

router.get('/:parentId?', getFoldersByParent); // <- ya existente
router.post('/', createFolder);                // <- ya existente
router.delete('/:id', deleteFolder);           // <- ✅ ESTA ES LA QUE FALTA

router.post('/upload', upload.single('file'), uploadFileToFolder);



export default router;
