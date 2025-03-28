'use client';
import React, { useState } from 'react';
import FolderBrowser from './FolderBrowser';
import './CertificadosCriticos.scss';

const CertificadosCriticos = () => {
  const [breadcrumb, setBreadcrumb] = useState([{ _id: null, name: 'Inicio' }]);
  const [currentFolder, setCurrentFolder] = useState(null);

  const handleFolderClick = (folder) => {
    setBreadcrumb(prev => [...prev, folder]);
    setCurrentFolder(folder._id);
  };

  const goToBreadcrumb = (folder, index) => {
    const newTrail = breadcrumb.slice(0, index + 1);
    setBreadcrumb(newTrail);
    setCurrentFolder(folder._id);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Control Carpetas</h2>

      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-container mb-3">
        {breadcrumb.map((folder, index) => (
          <span key={folder._id || 'inicio'}>
            <button
              onClick={() => goToBreadcrumb(folder, index)}
              className={`btn btn-link breadcrumb-btn px-0 ${index === breadcrumb.length - 1 ? 'active' : ''}`}
              disabled={index === breadcrumb.length - 1}
            >
              {folder.name}
            </button>
            {index < breadcrumb.length - 1 && <span className="mx-1">/</span>}
          </span>
        ))}
      </div>

      <FolderBrowser
        currentFolder={currentFolder}
        onFolderClick={handleFolderClick}
      />
    </div>
  );
};

export default CertificadosCriticos;