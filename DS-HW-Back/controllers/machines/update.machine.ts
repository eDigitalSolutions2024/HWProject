import { Request, Response } from 'express';
import config from '@config';
const { dataBase, entityUpdate } = config.message;
import logger from "@logger"
import { User as UserInterface } from "@interfaces/models/user"
import { Attachment, Calibration } from '@models';
import { TimeLine } from '@models';
import dayjs = require('dayjs');
import { Calibration as CalibrationInterface } from '@interfaces/models/calibration';
import fs from 'fs';

interface RequestBody extends Request {
    body: CalibrationInterface,
    user: UserInterface
}

const updateMachineController = async(req: RequestBody, res: Response) => {
    logger.verbose('[Machines, updateMachineController]', `User:${req?.user?.email} action: Update Machine`);
    const _id = req?.params?.id;
    let attachment1;
    let attachment2;
    let attachmentCert;

    //@ts-expect-error
    const foto_equipo = req?.files?.foto_equipo;
    //@ts-expect-error
    const foto_etiqueta_calibracion = req?.files?.foto_etiqueta_calibracion;
    //@ts-expect-error
    const cargar_certificado = req?.files?.cargar_certificado;

    const {
        id_maquina, nomMaquina, serial, manufacturador, seccion,
        proveedor, type, loc1, loc2, loc3, last_calibration_date,
        calibration_interval_define, expira, rango_trabajo, comments,
        liga_certificado, status
    } = req.body;

    try {
        const dateLastCalibDate = dayjs(last_calibration_date).toDate();
        const dateExpira = dayjs(expira).toDate();

        const machineExist = await Calibration.findById(_id);

        if (foto_equipo) {
            const attachmentData = {
                name: `${foto_equipo[0]?.originalname}`,
                category: 'userAttachment',
                fileType: foto_equipo[0]?.filename?.split('.')[1],
                file: foto_equipo[0]?.path,
                createdBy: req?.user?._id
            }
            attachment1 = await new Attachment(attachmentData);
        }

        if (foto_etiqueta_calibracion) {
            const attachmentData2 = {
                name: `${foto_etiqueta_calibracion[0]?.originalname}`,
                category: 'userAttachment',
                fileType: foto_etiqueta_calibracion[0]?.filename?.split('.')[1],
                file: foto_etiqueta_calibracion[0]?.path,
                createdBy: req?.user?._id
            }
            attachment2 = await new Attachment(attachmentData2);
        }

        if (cargar_certificado) {
            const attachmentDataCert = {
                name: `${cargar_certificado[0]?.originalname}`,
                category: 'userAttachment',
                fileType: cargar_certificado[0]?.filename?.split('.')[1],
                file: cargar_certificado[0]?.path,
                createdBy: req?.user?._id
            }
            attachmentCert = await new Attachment(attachmentDataCert);
        }

        await attachment1?.save();
        await attachment2?.save();
        await attachmentCert?.save();

        if (machineExist) {
            if (machineExist.foto_equipo && foto_equipo) {
                const existingAttachment = await Attachment.findById(machineExist.foto_equipo);
                if (fs.existsSync(`${existingAttachment?.file}`)) fs.unlinkSync(`${existingAttachment?.file}`);
                await Attachment.findByIdAndDelete(existingAttachment?._id);
            }

            if (machineExist.foto_etiqueta_calibracion && foto_etiqueta_calibracion) {
                const existingAttachment = await Attachment.findById(machineExist.foto_etiqueta_calibracion);
                if (fs.existsSync(`${existingAttachment?.file}`)) fs.unlinkSync(`${existingAttachment?.file}`);
                await Attachment.findByIdAndDelete(existingAttachment?._id);
            }

            if (machineExist.cargar_certificado && cargar_certificado) {
                const existingAttachment = await Attachment.findById(machineExist.cargar_certificado);
                if (fs.existsSync(`${existingAttachment?.file}`)) fs.unlinkSync(`${existingAttachment?.file}`);
                await Attachment.findByIdAndDelete(existingAttachment?._id);
            }
        }

        const calibration = await Calibration.findByIdAndUpdate(_id, {
            id_maquina, nomMaquina, serial, manufacturador, seccion,
            proveedor, type, loc1, loc2, loc3,
            last_calibration_date: dateLastCalibDate,
            calibration_interval_define, expira: dateExpira, rango_trabajo, comments,
            liga_certificado,
            foto_equipo: attachment1?._id,
            foto_etiqueta_calibracion: attachment2?._id,
            cargar_certificado: attachmentCert?._id,
            status
        });

        const event = {
            date: dayjs().toDate(),
            actionType: 'UPDATE',
            target: 'Machine',
            actionBy: req.user._id,
            actionDescription: `Maquina ${calibration?.id_maquina} ${calibration?.nomMaquina} Actualizada`,
            es: `Maquina ${calibration?.id_maquina} ${calibration?.nomMaquina} Actualizada`,
            en: `Machine ${calibration?.id_maquina} ${calibration?.nomMaquina} was updated`
        };

        TimeLine.create(event);

        logger.info('[Machines, updateMachineController] Succesfully');
        res.json(entityUpdate);
    } catch (error) {
        logger.error('[Machines, updateMachineController]', ` User:${req?.user?.email} `, error);
        res.status(501).json(dataBase);
    }
};

export default updateMachineController;
