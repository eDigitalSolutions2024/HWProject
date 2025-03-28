import { Request, Response } from 'express';
import path from 'path';
import { AttachmentCCA } from '@models';

const uploadAttachmentCCA = async (req: Request, res: Response) => {
  try {
    const { folderId } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ msg: 'Archivo requerido' });
    if (!folderId) return res.status(400).json({ msg: 'folderId requerido' });

    const name = file.originalname;
    const filePath = file.path?.replace(/\\/g, '/');
    const fileType = path.extname(name).replace('.', '') || 'unknown';

    const newAttachment = await AttachmentCCA.create({
      name,
      file: filePath,
      fileType,
      folder: folderId
    });

    res.status(201).json({ msg: 'Archivo subido correctamente', attachment: newAttachment });
  } catch (error) {
    console.error('❌ Error al subir archivo CCA:', error);
    res.status(500).json({ msg: 'Error interno', error });
  }
};

export default uploadAttachmentCCA;
