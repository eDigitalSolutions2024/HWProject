// FileUpload.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  folderId: string | null;
  onUploaded: () => void;
}

const FileUpload = ({ folderId, onUploaded }: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file || !folderId) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`/api/files/upload/${folderId}`, formData);
      setFile(null);
      onUploaded();
    } catch (err) {
      console.error('Error al subir archivo:', err);
    }
  };

  return (
    <div className="mt-3 d-flex gap-2">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="form-control"
      />
      <button className="btn btn-success" onClick={handleUpload}>
        Subir archivo
      </button>
    </div>
  );
};

export default FileUpload;
