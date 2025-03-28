// models/File.ts
import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true },
  path: { type: String, required: true }, // Ruta absoluta
  fileUrl: { type: String, required: true }, // Ubicación real del archivo
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.models.File || mongoose.model('File', FileSchema);
