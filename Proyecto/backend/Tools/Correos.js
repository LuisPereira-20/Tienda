import nodemailer from 'nodemailer';
import 'dotenv/config';

const recuperacion = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        usuario : process.env.USUARIO,
        contraseña : process.env.CONTRASEÑA,
    },
    tls : {
        rejectUnauthorized : false
    }
});
export default recuperacion