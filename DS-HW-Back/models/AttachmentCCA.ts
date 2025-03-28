import { Schema, model } from 'mongoose';

const AttachmentCCASchema = new Schema({
    name: String,
    file: String,
    fileType: String,
    folder: {
      type: Schema.Types.ObjectId,
      ref: 'Folder',
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  });
  
export default model('AttachmentCCA', AttachmentCCASchema);
