import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FolderView from './FolderView'; // Ensure the file './FolderView.tsx' exists in the same directory


const FolderBrowser = () => {
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [folders, setFolders] = useState([]);

  const fetchFolders = async (parentId = null) => {
    try {
      const res = await axios.get(`/api/folders/${parentId || ''}`);
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
    <div className='container mt-4'>
      <h2>Certificados Críticos de Agencia</h2>
      <FolderView
        folders={folders}
        onFolderClick={(folderId) => fetchFolders(folderId)}
        currentFolderId={currentFolderId}
        onFolderCreated={() => fetchFolders(currentFolderId)}
      />
    </div>
  );
};

export default FolderBrowser;
