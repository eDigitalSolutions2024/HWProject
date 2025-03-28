import { Request, Response } from 'express';
import { AttachmentCCA } from '@models';
import path from 'path';
import fs from 'fs';

const downloadAttachmentCCA = async (req: Request, res: Response) => {
  try {
    const { fileId } = req.params;

    const attachment = await AttachmentCCA.findById(fileId);
    if (!attachment || !attachment.file || !attachment.name) {
      return res.status(404).json({ msg: 'Archivo o ruta no válida' });
    }

    const filePath = path.resolve(attachment.file);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ msg: 'Archivo no existe en el servidor' });
    }

    res.download(filePath, attachment.name);
  } catch (error) {
    console.error('❌ Error al descargar archivo CCA:', error);
    res.status(500).json({ msg: 'Error interno al descargar', error });
  }
};

export default downloadAttachmentCCA;
