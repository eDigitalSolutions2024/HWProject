// FolderForm.tsx
'use client';
import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  parent: string | null;
  onFolderCreated: () => void;
}

const FolderForm = ({ parent, onFolderCreated }: Props) => {
  const [name, setName] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/folders', { name, parent });
      setName('');
      setShowForm(false);
      onFolderCreated();
    } catch (err) {
      console.error('Error creando carpeta:', err);
    }
  };

  return (
    <div className="mb-4">
      {showForm ? (
        <form onSubmit={handleSubmit} className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre de la carpeta"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-success">Crear</button>
          <button type="button" className="btn btn-dark" onClick={() => setShowForm(false)}>Cancelar</button>
        </form>
      ) : (
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Crear Carpeta</button>
      )}
    </div>
  );
};

export default FolderForm;