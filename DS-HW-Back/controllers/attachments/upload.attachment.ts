import { Request, Response } from 'express';
import { Attachment } from '@models';
import path from 'path';
import { User as UserInterface } from '@interfaces/models/user';

type CustomRequest = Request & {
  user?: UserInterface;
};

const uploadAttachmentController = async (req: CustomRequest, res: Response) => {
  try {
    const { folderId } = req.body;
    const file = req.file;

    if (!file) {
      console.error('❌ No se recibió el archivo');
      return res.status(400).json({ msg: 'Archivo requerido' });
    }

    if (!folderId) {
      console.error('❌ No se recibió folderId');
      return res.status(400).json({ msg: 'folderId requerido' });
    }

    if (!req.user || !req.user._id) {
      console.error('❌ No se encontró el ID de usuario');
      return res.status(401).json({ msg: 'No se encontró el ID de usuario' });
    }

    const name = file.originalname;
    const filePath = file.path?.replace(/\\/g, '/');
    const fileType = path.extname(name).replace('.', '') || 'unknown';
    const category = 'FolderAttachment';
    const createdBy = req.user._id;

    console.log('📎 Subiendo archivo con:', {
      name,
      filePath,
      fileType,
      folderId,
      category,
      createdBy,
    });

    const attachment = await Attachment.create({
      name,
      file: filePath,
      fileType,
      folder: folderId,
      category,
      createdBy,
    });

    res.status(201).json({ msg: 'Archivo subido exitosamente', attachment });
  } catch (error: any) {
    console.error('❌ Error en uploadAttachmentController:', error.message, error.errors || error);
    res.status(500).json({ msg: 'Error interno al subir archivo', error });
  }
};

export default uploadAttachmentController;
