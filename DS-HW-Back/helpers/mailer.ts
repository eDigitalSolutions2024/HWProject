import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path';
 

dotenv.config({
  path: path.resolve(__dirname, '../../.env') // desde helpers hasta raíz
});

console.log('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY);


const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY as string
    }
});

export default transporter;
