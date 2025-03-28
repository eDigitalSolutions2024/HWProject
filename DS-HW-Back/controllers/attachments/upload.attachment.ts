import { Request, Response } from 'express';
import { Attachment } from '@models';
import fs from 'fs';
import path from 'path';

const uploadAttachmentController = async (req: Request, res: Response) => {
  try {
    const { folderId } = req.body;
    const file = req.file;

    console.log('REQ.BODY:', req.body);
    console.log('REQ.FILE:', req.file);

    if (!file || !folderId) {
      return res.status(400).json({ msg: 'Archivo y folderId son requeridos' });
    }

    // 👇 Valores forzados por ahora
    const attachment = new Attachment({
      name: file.originalname || 'Archivo sin nombre',
      file: file.path || 'ruta/desconocida',
      fileType: path.extname(file.originalname).replace('.', '') || 'desconocido',
      category: 'FolderAttachment',
      createdBy: '64edeb29467d39a9f6e35b2b', // <-- Asegúrate que este ID existe
      folder: folderId
    });

    await attachment.save();

    return res.status(201).json({ msg: 'Archivo subido correctamente', attachment });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ msg: 'Error al subir archivo', error: err });
  }
};

export default uploadAttachmentController;
