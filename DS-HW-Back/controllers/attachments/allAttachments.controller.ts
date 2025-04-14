import { Request, Response } from 'express';
import AttachmentModel from '../../models/attachment';

export const getAllAttachments = async (req: Request, res: Response) => {
  try {
    const archivos = await AttachmentModel.find().populate('folder', 'name');
    res.status(200).json(archivos);
  } catch (error) {
    console.error('❌ Error al obtener todos los archivos:', error);
    res.status(500).json({ error: 'Error al obtener archivos' });
  }
};
