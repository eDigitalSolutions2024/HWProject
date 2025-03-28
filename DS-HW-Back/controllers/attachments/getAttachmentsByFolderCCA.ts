import { Request, Response } from 'express';
import { AttachmentCCA } from '@models';

const getAttachmentsByFolderCCA = async (req: Request, res: Response) => {
  try {
    const { folderId } = req.params;

    if (!folderId) return res.status(400).json({ msg: 'Falta el folderId' });

    const attachments = await AttachmentCCA.find({ folder: folderId }).sort({ uploadedAt: -1 });
    res.json(attachments);
  } catch (error) {
    console.error('❌ Error al obtener archivos:', error);
    res.status(500).json({ msg: 'Error interno', error });
  }
};

export default getAttachmentsByFolderCCA;
