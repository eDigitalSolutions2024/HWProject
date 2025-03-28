'use client';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
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
  name: string;
  file: string;
  filename?: string; // 👈 Opcional
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
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    fetchFolders();
    if (currentFolder) fetchFiles();
    else setFiles([]);
  }, [currentFolder]);

  const fetchFolders = async () => {
    try {
      const res = await axiosInstance.get(`/folders/${currentFolder || ''}`);
      setFolders(res.data);
    } catch (err) {
      console.error('Error fetching folders:', err);
      toast.error('Error al cargar carpetas');
    }
  };

  const fetchFiles = async () => {
    try {
      console.log('📥 Fetching archivos de folder:', currentFolder);
      const res = await axiosInstance.get(`/attachments/folder/${currentFolder}`);
      console.log('📦 Archivos recibidos:', res.data);
      setFiles(res.data);
    } catch (err) {
      console.error('Error fetching files:', err);
      toast.error('Error al cargar archivos');
    }
  };

  const handleCreateFolder = async () => {
    if (!folderName.trim()) return;
    try {
      await axiosInstance.post('/folders', {
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
      await axiosInstance.delete(`/folders/${folderId}`);
      fetchFolders();
      toast.success('Carpeta eliminada exitosamente');
    } catch (err) {
      console.error('Error deleting folder:', err);
      toast.error('Error al eliminar carpeta');
    }
  };

  const handleFileUpload = async () => {
    if (!file || !currentFolder) return;

    console.log('📤 Subiendo archivo a folder:', currentFolder);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folderId', currentFolder);

    setUploading(true);
    try {
      const res = await axiosInstance.post('/attachments/cca/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          const progress = Math.round((e.loaded * 100) / (e.total || 1));
          setUploadProgress(progress);
        },
      });

      console.log('✅ Archivo subido:', res.data);

      setFile(null);
      fetchFiles();
      toast.success('Archivo subido exitosamente');
    } catch (err) {
      console.error('Error uploading file:', err);
      toast.error('Error al subir archivo');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    const confirmed = window.confirm('¿Deseas eliminar este archivo?');
    if (!confirmed) return;
    try {
      await axiosInstance.delete(`/folders/file/${fileId}`);
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
              disabled={!currentFolder}
            />
            <button className="btn btn-primary" onClick={handleFileUpload} disabled={!currentFolder || uploading}>
              {uploading ? 'Subiendo...' : 'Subir'}
            </button>
          </div>

          {uploading && (
            <div className="progress w-100 mb-3">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${uploadProgress}%` }}
                aria-valuenow={uploadProgress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {uploadProgress}%
              </div>
            </div>
          )}

<div className="file-list">
  {files.map((f) => (
    <div
      key={f._id}
      className="file-item d-flex justify-content-between align-items-center p-3 mb-2 bg-light border rounded shadow-sm animate-fade-in"
    >
      <div className="d-flex align-items-center">
        <span className="me-2 fs-5 text-danger">📄</span>
        <a
          href={`/api/attachments/cca/${f._id}/download`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none text-dark fw-semibold"
        >
          {f.name || f.filename}
        </a>
      </div>
      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteFile(f._id)}>
        🗑️
      </button>
    </div>
  ))}
</div>


          {files.length === 0 && !uploading && (
            <div className="text-muted text-center mt-3">📭 No hay archivos en esta carpeta</div>
          )}
        </div>
      )}
    </div>
  );
};

export default FolderBrowser;
