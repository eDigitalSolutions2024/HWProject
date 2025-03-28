import { Request, Response } from 'express';
import { Attachment } from '@models';

const getFilesByFolderController = async (req: Request, res: Response) => {
  const { folderId } = req.params;

  try {
    const files = await Attachment.find({ folder: folderId });
    return res.json(files);
  } catch (error) {
    console.error('Error fetching files by folder:', error);
    return res.status(500).json({ msg: 'Error al obtener archivos por carpeta' });
  }
};

export default getFilesByFolderController;
