import React, { useState } from 'react';
import axios from 'axios';

const FolderView = ({ folders, onFolderClick, currentFolderId, onFolderCreated }) => {
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/folders', {
        name,
        parent: currentFolderId || null
      });
      setName('');
      setIsCreating(false);
      onFolderCreated();
    } catch (err) {
      console.error('Error al crear carpeta:', err);
    }
  };

  return (
    <div className='mt-3'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h5>Carpetas</h5>
        <button className='btn btn-sm btn-primary' onClick={() => setIsCreating(!isCreating)}>
          {isCreating ? 'Cancelar' : 'Crear Carpeta'}
        </button>
      </div>

      {isCreating && (
        <form className='mb-3' onSubmit={handleCreateFolder}>
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Nombre de la carpeta'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <button className='btn btn-success' type='submit'>Crear</button>
          </div>
        </form>
      )}

      <ul className='list-group'>
        {folders.length === 0 && <li className='list-group-item text-muted'>No hay carpetas</li>}
        {folders.map(folder => (
          <li
            key={folder._id}
            className='list-group-item list-group-item-action pointer'
            onClick={() => onFolderClick(folder._id)}
          >
            📁 {folder.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FolderView;
