import { Request, Response } from 'express';
import config from '@config';
const { entityCreate, dataBase } = config.message;
import logger from "@logger"
import { User as UserInterface } from "@interfaces/models/user"
import { Attachment, Calibration } from '@models';
import { TimeLine } from '@models';
import dayjs = require('dayjs');
import { Calibration as CalibrationInterface } from '@interfaces/models/calibration';
interface RequestBody extends Request {
    body: CalibrationInterface,
    user: UserInterface
}

const createMachineController = async (req: RequestBody, res: Response) => {
    logger.verbose('[Machines, createMachineController]', `User:${req?.user?.email} Add new Machine`);

    let attachment1;
    let attachment2;
    let attachment3;

    const foto_equipo = (req.files as { [fieldname: string]: Express.Multer.File[] })?.foto_equipo;
    const foto_etiqueta_calibracion = (req.files as { [fieldname: string]: Express.Multer.File[] })?.foto_etiqueta_calibracion;
    const certificado_file = (req.files as { [fieldname: string]: Express.Multer.File[] })?.cargar_certificado;

    const {
        id_maquina, nomMaquina, serial, manufacturador, seccion,
        proveedor, type, loc1, loc2, loc3, last_calibration_date,
        calibration_interval_define, expira, rango_trabajo, comments,
        liga_certificado
    } = req.body;

    try {
        const dateLastCalibDate = dayjs(last_calibration_date).toDate();
        const dateExpira = dayjs(expira).toDate();

        if (foto_equipo?.[0]) {
            const file = foto_equipo[0];
            attachment1 = new Attachment({
                name: file.originalname,
                category: 'userAttachment',
                fileType: file.filename.split('.').pop(),
                file: file.path,
                createdBy: req?.user?._id
            });
            await attachment1.save();
        }

        if (foto_etiqueta_calibracion?.[0]) {
            const file = foto_etiqueta_calibracion[0];
            attachment2 = new Attachment({
                name: file.originalname,
                category: 'userAttachment',
                fileType: file.filename.split('.').pop(),
                file: file.path,
                createdBy: req?.user?._id
            });
            await attachment2.save();
        }

        if (certificado_file?.[0]) {
            const file = certificado_file[0];
            attachment3 = new Attachment({
                name: file.originalname,
                category: 'userAttachment',
                fileType: file.filename.split('.').pop(),
                file: file.path,
                createdBy: req?.user?._id
            });
            await attachment3.save();
        }

        const calibration = new Calibration({
            id_maquina,
            nomMaquina,
            serial,
            manufacturador,
            seccion,
            cargar_certificado: attachment3?._id,
            proveedor,
            type,
            loc1,
            loc2,
            loc3,
            last_calibration_date: dateLastCalibDate,
            calibration_interval_define,
            expira: dateExpira,
            rango_trabajo,
            comments,
            liga_certificado,
            foto_equipo: attachment1?._id,
            foto_etiqueta_calibracion: attachment2?._id
        });

        await calibration.save();

        const event = {
            date: dayjs().toDate(),
            actionType: 'CREATE',
            target: 'Machine',
            actionBy: req.user._id,
            actionDescription: `Maquina ${calibration.id_maquina} ${calibration.nomMaquina} Creado`,
            es: `Maquina ${calibration.id_maquina} ${calibration.nomMaquina} Creado`,
            en: `Machine ${calibration.id_maquina} ${calibration.nomMaquina} was created`
        }

        logger.info('[Machine, createMachineController] Succesfully')
        await TimeLine.create(event);

        return res.json(entityCreate);
    } catch (error) {
        logger.error('[Machines, createMachineController]', ` User:${req.user.email} `, error);
        return res.json(dataBase);
    }
}


export default createMachineController;