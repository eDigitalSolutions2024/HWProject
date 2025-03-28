import Folder from '../../models/folder';

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
