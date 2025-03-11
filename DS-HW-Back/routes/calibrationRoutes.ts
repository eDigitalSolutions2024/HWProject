import { Router, RequestHandler } from 'express';
import config from "@config"
const { createPermissions, readPermissions, updatePermissions, } = config.permissionType;
const { machines } = config.routes;
import { validationFields } from '@middlewares/validation-fields';

import { permission } from '@middlewares/RoleValidation';
import { check } from "express-validator"
import jwtValidation from '@middlewares/webtokenValidation';
import { v4 } from "uuid"
import path from "path"
import multer from 'multer'
import { createMachineController, deleteMachineController, getMachineController, 
        listMachineController, updateMachineController, getMachineImageController, 
        getMachineTagController, getAllMachineController, getMachineByIdController,
        getMachineGuestImgController, getMachineGuestTagController } from '@machinecontrollers'
import { checkExpirationDate } from '@mailcontrollers'
import { qrcode } from '@qrcodecontrollers'
import { Calibration } from '@models';

type PermissionOptions = 'createPermissions' | 'readPermissions' | 'updatePermissions' | 'deletePermissions'
const maxSize = 20 * 1024 * 1024
const storage = multer.diskStorage({
    destination: './assets',
    filename: (req, file, cb) => {
        cb(null, v4() + path.extname(file.originalname).toLocaleLowerCase())
    }
})
const uploadFile = multer({ storage, dest: './assets', limits: { fileSize: maxSize } })
const router = Router();

///////////////// POST ////////////////////////////////////////

router.post('/', [
    jwtValidation,
    permission(createPermissions as PermissionOptions, machines),
    uploadFile.fields([{name: 'foto_equipo'},{name: 'foto_etiqueta_calibracion'},{ name: 'cargar_certificado', maxCount: 1 }]),
    validationFields
] as RequestHandler[], createMachineController);

////////////////// GET ///////////////////////////////////////
router.get('/', [
    jwtValidation,
    permission(readPermissions as PermissionOptions, machines),
    validationFields
] as RequestHandler[], listMachineController);

router.get('/checkExpiration', [
    jwtValidation,
    permission(readPermissions as PermissionOptions, machines),
    validationFields
] as RequestHandler[], checkExpirationDate);

router.get('/allmachines', [
    jwtValidation,
    permission(readPermissions as PermissionOptions, machines),
    validationFields
] as RequestHandler[], getAllMachineController);

router.get('/id/:id_maquina', [
    jwtValidation,
    check('id_maquina', 'The id is required'),
    validationFields
] as RequestHandler[], getMachineController);

//no-auth
router.get('/guest/id/:id_maquina', [
    check('id_maquina', 'The id is required'),
    validationFields
] as RequestHandler[], getMachineByIdController);

router.get('/image/:machineId', [
    jwtValidation,
    check('machineId', 'The id is required'),
    validationFields
] as RequestHandler[], getMachineImageController)

//no-auth
router.get('/guest/image/:machineId', [
    check('machineId', 'The id is required'),
    validationFields
] as RequestHandler[], getMachineGuestImgController)

router.get('/tag/image/:tagId', [
    jwtValidation,
    check('tagId', 'The id is required'),
    validationFields
] as RequestHandler[], getMachineTagController)

//no-auth
router.get('/guest/tag/image/:tagId', [
    check('tagId', 'The id is required'),
    validationFields
] as RequestHandler[], getMachineGuestTagController)

router.get('/guest/qr/id/:id_maquina', [
    jwtValidation,
    check('id_maquina', 'The id is required'),
    validationFields
] as RequestHandler[], qrcode);

////////////////// UPDATE ///////////////////////////////////////
router.put('/updatebyadmin/:id', [
    jwtValidation,
    permission(updatePermissions as PermissionOptions, machines),
    uploadFile.fields([{name: 'foto_equipo'},{name: 'foto_etiqueta_calibracion'},{ name: 'cargar_certificado', maxCount: 1 }]),
    validationFields
] as RequestHandler[], updateMachineController);


////////////////// DELETE ///////////////////////////////////////
router.delete('/deletebyadmin/:id', [
    jwtValidation,
    permission(readPermissions as PermissionOptions, machines),
    validationFields
] as RequestHandler[], deleteMachineController);

// ✅ Add this route
router.post('/check-duplicate', async (req, res) => {
    const { field, value } = req.body;

    if (!field || !value) {
        return res.status(400).json({ success: false, message: 'Field and value are required' });
    }

    try {
        const exists = await Calibration.exists({ [field]: value });
        return res.status(200).json({ exists: !!exists }); // ✅ Proper JSON
    } catch (err) {
        console.error('[Machine, check-duplicate]', err);
        return res.status(500).json({ success: false, message: 'Internal server error' }); // ✅ JSON too
    }
});


export default router;