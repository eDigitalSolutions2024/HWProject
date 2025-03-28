// models/Folder.ts
import mongoose from 'mongoose';

const FolderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    default: null // null indica que es una carpeta raíz
  },
  path: {
    type: String,
    required: true // Ejemplo: /Carpeta1/Sub1/Sub2
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Folder || mongoose.model('Folder', FolderSchema);
