import Folder from '../../models/folder';
import { Attachment } from '../../models'; // Ajusta el path si es necesario

import { Request, Response } from 'express';

export const getFoldersByParent = async (req: Request, res: Response) => {
  const parentId = req.params.parentId || null;
  const folders = await Folder.find({ parent: parentId });
  res.json(folders);
};

export const createFolder = async (req: Request, res: Response) => {
  const { name, parent } = req.body;
  const parentFolder = parent ? await Folder.findById(parent) : null;
  const path = parentFolder ? `${parentFolder.path}/${name}` : `/${name}`;

  const newFolder = new Folder({ name, parent: parent || null, path });
  await newFolder.save();

  res.status(201).json(newFolder);
};

export const deleteFolder = async (req: Request, res: Response) => {
  try {
    const folderId = req.params.id;

    const folder = await Folder.findById(folderId);
    if (!folder) {
      return res.status(404).json({ message: 'Carpeta no encontrada' });
    }

    await Folder.findByIdAndDelete(folderId);
    res.json({ message: 'Carpeta eliminada correctamente' });
  } catch (error) {
    console.error('Error eliminando carpeta:', error);
    res.status(500).json({ message: 'Error al eliminar carpeta' });
  }
};

export const getAllFolders = async (req: Request, res: Response) => {
    try{
      const folders = await Folder.find();
    } catch (error) {
      console.error('Error al obtener todas las carpetas', error);
      res.status(500).json({ message: 'Error al obtener carpetas'});
    }
  };

export const uploadFileToFolder = async (req: Request, res: Response) => {
  const folderId = req.body.folderId;
  const file = req.file;

  if (!file || !folderId) {
    return res.status(400).json({ message: 'Archivo o folderId faltante' });
  }

  const attachment = await Attachment.create({
    filename: file.originalname,
    path: file.path,
    mimetype: file.mimetype,
    folder: folderId,
  });

  res.json({ message: 'Archivo subido exitosamente', fileId: attachment._id });
};
