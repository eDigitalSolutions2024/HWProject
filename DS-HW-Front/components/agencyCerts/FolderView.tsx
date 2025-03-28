// FolderView.tsx
'use client';
import React from 'react';

interface Folder {
  _id: string;
  name: string;
  path: string;
  parent: string | null;
}

interface Props {
  folders: Folder[];
  onFolderClick: (folderId: string) => void;
  currentFolderId: string | null;
  onFolderCreated: () => void;
}

const FolderView = ({ folders, onFolderClick }: Props) => {
  return (
    <div>
      <h5 className="mb-2">Carpetas</h5>
      {folders.length === 0 ? (
        <div className="alert alert-light">No hay carpetas</div>
      ) : (
        <ul className="list-group">
          {folders.map(folder => (
            <li
              key={folder._id}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center pointer"
              onClick={() => onFolderClick(folder._id)}
            >
              <span><i className="bi bi-folder-fill me-2 text-warning"></i>{folder.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FolderView;
