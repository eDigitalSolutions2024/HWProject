import { Request, Response } from 'express';
import config from '@config';
const { entityCreate, dataBase } = config.message;
import logger from "@logger"
import { User as UserInterface } from "@interfaces/models/user"
import { Attachment, Calibration } from '@models';
import dayjs = require('dayjs');
import { Calibration as CalibrationInterface } from '@interfaces/models/calibration';
const ObjectId = require('mongoose').Types.ObjectId

interface RequestBody extends Request {
    body: CalibrationInterface,
    user: UserInterface
}

/**
 * This method is for get a list of Users
 * @param {number} since
 * @param {number} limit
 * @param {boolean} status   
 * @return {json} json String
 */

const listMachineController = async (req: RequestBody, res: Response) => {
    logger.verbose('[Machine, listMachineController]', `User:${req.user.email} action:Get Machine List`);

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 1000;
    const search = req.query.search as string || "";

    const since = (page - 1) * limit;

    let query: any[] = [];

    if (search) {
        query.push({
            $or: [
                { id_maquina: { $regex: search, $options: 'i' } },
                { nomMaquina: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ]
        });
    }

    query.push({ status: true });

    const [total, machine] = await Promise.all([
        Calibration.countDocuments({ $and: query }),
        Calibration.find({ $and: query })
            .skip(since)
            .limit(limit)
    ]);

    logger.info('[Machine, listMachineController] Successfully retrieved');
    res.json({ total, machine });
};


export default listMachineController;