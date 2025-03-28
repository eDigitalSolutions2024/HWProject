import Folder from '../models/folder';

export const getFoldersByParent = async (req, res) => {
  const parentId = req.params.parentId || null;
  const folders = await Folder.find({ parent: parentId });
  res.json(folders);
};

export const createFolder = async (req, res) => {
  const { name, parent } = req.body;
  const parentFolder = parent ? await Folder.findById(parent) : null;
  const path = parentFolder ? `${parentFolder.path}/${name}` : `/${name}`;

  const newFolder = new Folder({ name, parent: parent || null, path });
  await newFolder.save();

  res.status(201).json(newFolder);
};
