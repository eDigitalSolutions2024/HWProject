'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FolderView from './FolderView';
import FolderForm from './FolderForm';

interface Folder {
  _id: string;
  name: string;
  path: string;
  parent: string | null;
}

const FolderBrowser = () => {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);

  const fetchFolders = async (parentId: string | null = null) => {
    try {
      const res = await axios.get(`/api/folders/${parentId ?? ''}`);
      setFolders(res.data);
      setCurrentFolderId(parentId);
    } catch (err) {
      console.error('Error al cargar carpetas:', err);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <div>
      <FolderForm parent={currentFolderId} onFolderCreated={() => fetchFolders(currentFolderId)} />
      <FolderView
        folders={folders}
        onFolderClick={(folderId: string) => fetchFolders(folderId)}
        currentFolderId={currentFolderId}
        onFolderCreated={() => fetchFolders(currentFolderId)}
      />
    </div>
  );
};

export default FolderBrowser;
