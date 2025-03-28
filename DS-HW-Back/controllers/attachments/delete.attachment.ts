import { Request, Response } from 'express';
import { Attachment } from '@models';
import logger from '@logger';

const deleteAttachmentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const attachment = await Attachment.findById(id);
    if (!attachment) {
      return res.status(404).json({ msg: 'Archivo no encontrado' });
    }

    await Attachment.findByIdAndDelete(id);

    logger.info(`[Attachments, deleteAttachmentController] Archivo ${id} eliminado`);
    return res.json({ msg: 'Archivo eliminado exitosamente' });
  } catch (error) {
    logger.error('[Attachments, deleteAttachmentController]', error);
    return res.status(500).json({ msg: 'Error al eliminar archivo' });
  }
};

export default deleteAttachmentController;
