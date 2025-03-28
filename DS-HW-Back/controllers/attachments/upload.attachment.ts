import { Request, Response } from 'express';
import { Attachment } from '@models';
import fs from 'fs';
import path from 'path';

const uploadAttachmentController = async (req: Request, res: Response) => {
  try {
    const { folderId } = req.body;
    const file = req.file;

    if (!file || !folderId) {
      return res.status(400).json({ msg: 'Archivo y folderId son requeridos' });
    }

    // 👇 Simulación de ID de usuario para pruebas
    const createdBy = '64edeb29467d39a9f6e35b2b'; // Reemplaza por el ID real del usuario logueado

    const attachment = new Attachment({
      name: file.originalname,                                // ✅ nombre visible
      file: file.path,                                         // ✅ path real del archivo en disco
      fileType: path.extname(file.originalname).slice(1),      // ✅ extensión sin punto
      category: 'FolderAttachment',                            // ✅ categoría por defecto (ajustable)
      createdBy,                                               // ✅ ID de usuario (por ahora hardcodeado)
      folder: folderId                                         // ✅ carpeta a la que pertenece
    });

    await attachment.save();

    return res.status(201).json({ msg: 'Archivo subido', attachment });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ msg: 'Error al subir archivo' });
  }
};

export default uploadAttachmentController;
