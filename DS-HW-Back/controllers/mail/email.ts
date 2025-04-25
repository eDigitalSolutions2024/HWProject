import { Request, Response } from 'express';
import { Calibration } from '@models';
import dayjs = require('dayjs');
import { Calibration as CalibrationInterface } from '@interfaces/models/calibration';
import logger from "@logger"
import { User as UserInterface } from "@interfaces/models/user"
import transporter from "../../helpers/mailer"
import cron = require('node-cron')
//import nodemailer from 'nodemailer';
//import { error } from 'console';

interface RequestBody extends Request {
    body: CalibrationInterface,
    user: UserInterface
}

const checkExpirationDate = async (req: RequestBody, res: Response) => {
    try {
        logger.verbose('[Machine, checkExpirationDate]', `User:${req.user.email} action: Send Mail with Expiration Dates`);
        
        const [total, machines] = await Promise.all([
            Calibration.countDocuments({ status: true }),
            Calibration.find({ status: true })
        ]);
        
        let body: string[] = [];

        machines.forEach((machine: { expira: any; id_maquina: any; nomMaquina: any; }) => {
            const expirationDate = machine.expira;
            const daysRemaining = calculateDaysRemaining(expirationDate);

            if (daysRemaining <= 15 && daysRemaining >= 0) {
                console.log(`Quedan ${daysRemaining} días antes de la expiración maquina: ${machine.id_maquina} - ${machine.nomMaquina}.`);
                body.push(`${machine.id_maquina} - ${machine.nomMaquina}: ${daysRemaining} días antes de la expiración`);
            }
        });

        if (body.length === 0) {
            return res.status(200).json({ ok: true, msg: "No hay máquinas próximas a expirar." });
        }

        const arrayAsString = body.join('\n');

        await transporter.sendMail({
            from: 'eolivas@edigitalsolutions.com.mx',  // Solo el correo sin nombre
            to: ["eolivas2212@hotmail.com"],
            subject: "Alerta Máquinas por Expirar",
            text: `${arrayAsString}`
        });
        

        console.log("✅ Correo enviado con éxito.");
        res.status(200).json({ ok: true, msg: "Mensaje enviado con éxito." });
    } catch (error) {
        console.error("❌ Error al enviar el correo:", error);
        res.status(500).json({ ok: false, msg: "No se pudo enviar el correo. Intente más tarde." });
    }
};

function isWeekday(date: Date) {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 es domingo, 6 es sábado
}

function calculateDaysRemaining(expirationDate: number | Date) {
    const currentDate = new Date();
    let daysRemaining = 0;

    while (currentDate < expirationDate && daysRemaining <= 7) {
        currentDate.setDate(currentDate.getDate() + 1);
        if (isWeekday(currentDate)) {
            daysRemaining++;
        }
    }

    return daysRemaining;
}

/*const sendReminders = async() => {
    try{
        logger.verbose(['Mail, cron send reminder']);

        const machines = await Calibration.find({status:true});

        const reminders: string[] = [];

        const today = new Date();

        machines.forEach((machine: any) => {
            const expirationDate = new Date(machine.expira);
            const reminderDate = new Date(expirationDate);
            reminderDate.setDate(reminderDate.getDate() - 1);// recordatorio 1 dia antes

            if (
                reminderDate.getDate() === today.getDate() &&
                reminderDate.getMonth() === today.getMonth() &&
                reminderDate.getFullYear() == today.getFullYear()
            ) {
                reminders.push(`${machine.id_maquina} - ${machine.nomMaquina} expira mañana`);
            }
        });

        if (reminders.length == 0){
            console.log("✅ No hay recordatorios por hoy")
            return;
        }

        const body = reminders.join('\n');

        await transporter.sendMail({
            from: 'eddyvazquez2003@outlook.com',
            to: ['eddy.vazquez1530@gmail.com'],
            subject: '🔔 Recordatorio: Calibraciones que expiran mañana',
            text: body,
        });

        console.log('✅ Recordatorio enviado automaticamente');
    } catch (error) {
        console.error('❌ Error al enviar recordatorios automaticamente: ', error);
    }
}*/

// Automatic Task to send mail at 7:00am excludes Sat and Sun
cron.schedule('0 7 * * 1-5', async () => {
    try {
        await SendMail();
        console.log('Mail sent successfully at 7:00 AM.');
    } catch (error) {
        console.error('Error sending mail:', error);
    }
});

/*cron.schedule('* * * * *', async () => {
    try{
        await sendReminders();
        console.log('Recordatorios enviados a las 8:00 AM.');
    } catch (error) {
        console.error('Error al ejecutar envio de recordatorios: ', error);
    }
});*/

async function SendMail() {
    try {
        logger.verbose('[Machine, cron send mail]');

        const [total, machines] = await Promise.all([
            Calibration.countDocuments({ status: true }),
            Calibration.find({ status: true })
        ]);

        let body: string[] = [];

        machines.forEach((machine: { expira: any; id_maquina: any; nomMaquina: any; }) => {
            const expirationDate = machine.expira;
            const daysRemaining = calculateDaysRemaining(expirationDate);

            if (daysRemaining <= 15 && daysRemaining >= 0) {
                console.log(`Quedan ${daysRemaining} días antes de la expiración maquina: ${machine.id_maquina} - ${machine.nomMaquina}.`);
                body.push(`${machine.id_maquina} - ${machine.nomMaquina}: ${daysRemaining} días antes de la expiración`);
            }
        });

        if (body.length === 0) {
            console.log("✅ No hay máquinas próximas a expirar.");
            return;
        }

        const arrayAsString = body.join('\n');

        await transporter.sendMail({
            from: 'eolivas@edigitalsolutions.com.mx',  // Solo el correo sin nombre
            to: ["eolivas2212@hotmail.com"],
            subject: "Alerta Máquinas por Expirar",
            text: `${arrayAsString}`
        });
        

        console.log("✅ Correo de alerta enviado con éxito.");
    } catch (error) {
        console.error("❌ Error al enviar el correo desde cron job:", error);
    }
}

//sendReminders(); // es para ejecutarlo al iniciar el programa

export default checkExpirationDate;
//SendMail(); // Manually trigger email sending
