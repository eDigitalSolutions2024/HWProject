'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FolderBrowser.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Folder {
  _id: string;
  name: string;
  parent?: string;
}

interface FileItem {
  _id: string;
  filename: string;
  path: string;
}

interface Props {
  currentFolder: string | null;
  onFolderClick: (folder: Folder) => void;
}

const FolderBrowser: React.FC<Props> = ({ currentFolder, onFolderClick }) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchFolders();
    if (currentFolder) fetchFiles();
    else setFiles([]);
  }, [currentFolder]);

  const fetchFolders = async () => {
    try {
      const res = await axios.get(`/api/folders/${currentFolder || ''}`);
      setFolders(res.data);
    } catch (err) {
      console.error('Error fetching folders:', err);
      toast.error('Error al cargar carpetas');
    }
  };

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`/api/attachments/folder/${currentFolder}`);
      setFiles(res.data);
    } catch (err) {
      console.error('Error fetching files:', err);
      toast.error('Error al cargar archivos');
    }
  };

  const handleCreateFolder = async () => {
    if (!folderName.trim()) return;
    try {
      await axios.post('/api/folders', {
        name: folderName,
        parent: currentFolder,
      });
      setFolderName('');
      setShowForm(false);
      fetchFolders();
      toast.success('Carpeta creada exitosamente');
    } catch (err) {
      console.error('Error creating folder:', err);
      toast.error('Error al crear carpeta');
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta carpeta?');
    if (!confirmed) return;
    try {
      await axios.delete(`/api/folders/${folderId}`);
      fetchFolders();
      toast.success('Carpeta eliminada exitosamente');
    } catch (err) {
      console.error('Error deleting folder:', err);
      toast.error('Error al eliminar carpeta');
    }
  };

  const handleFileUpload = async () => {
    if (!file || !currentFolder) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folderId', currentFolder);
    try {
      await axios.post('/api/folders/upload', formData);
      setFile(null);
      fetchFiles();
      toast.success('Archivo subido exitosamente');
    } catch (err) {
      console.error('Error uploading file:', err);
      toast.error('Error al subir archivo');
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    const confirmed = window.confirm('¿Deseas eliminar este archivo?');
    if (!confirmed) return;
    try {
      await axios.delete(`/api/folders/file/${fileId}`);
      fetchFiles();
      toast.success('Archivo eliminado exitosamente');
    } catch (err) {
      console.error('Error deleting file:', err);
      toast.error('Error al eliminar archivo');
    }
  };

  return (
    <div className="folder-browser">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="text-primary fw-bold">📁 Carpetas</h4>
        <button className="btn btn-outline-primary rounded-pill shadow-sm px-3 py-1" onClick={() => setShowForm(!showForm)}>
          ➕ Crear Carpeta
        </button>
      </div>

      {showForm && (
        <div className="card p-3 mb-3 shadow-sm animate-slide-in">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Nombre de la carpeta"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <button className="btn btn-success w-100" onClick={handleCreateFolder}>
            Guardar
          </button>
        </div>
      )}

      <div className="folder-list">
        {folders.map((folder) => (
          <div
            key={folder._id}
            className="folder-item pointer d-flex align-items-center justify-content-between p-3 mb-2 bg-white border rounded shadow-sm hover-folder animate-fade-in"
            onClick={() => onFolderClick(folder)}
          >
            <div className="d-flex align-items-center w-100">
              <span className="me-2 fs-5">📂</span>
              <span className="fw-semibold flex-grow-1">{folder.name}</span>
            </div>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteFolder(folder._id);
              }}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      {currentFolder && (
        <div className="mt-4">
          <h5 className="mb-3">📎 Archivos</h5>
          <div className="mb-3 d-flex">
            <input
              type="file"
              className="form-control me-2"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <button className="btn btn-primary" onClick={handleFileUpload}>
              Subir
            </button>
          </div>

          <ul className="list-group">
            {files.map((f) => (
              <li key={f._id} className="list-group-item d-flex justify-content-between align-items-center">
                <a href={`/api/attachments/${f._id}/download`} target="_blank" rel="noopener noreferrer">
                  {f.filename}
                </a>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteFile(f._id)}>
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FolderBrowser;
