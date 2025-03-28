// FolderForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  parentId: string | null;
  onCreated: () => void;
}

const FolderForm = ({ parentId, onCreated }: Props) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await axios.post('/api/folders', { name, parent: parentId });
      setName('');
      onCreated();
    } catch (err) {
      console.error('Error al crear carpeta:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2 mt-3">
      <input
        type="text"
        placeholder="Nombre de la carpeta"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-control"
      />
      <button className="btn btn-primary" type="submit">
        Crear
      </button>
    </form>
  );
};

export default FolderForm;
