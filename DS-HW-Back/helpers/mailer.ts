import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

// Carga las variables del archivo .env
dotenv.config()

const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY as string
    }
});

export default transporter;
