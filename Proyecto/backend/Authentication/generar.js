import jwt from "jsonwebtoken";
import  "dotenv/config";

const firma =(payload, acceso)=>{
    return jwt.sign(
        payload,
        acceso ?
        process.env.ACESS_TOKEN : process.env.REFRESH_TOKEN, {
            algorithm: 'HS256',
            expiresIn: acceso ? '1d' : '2d'
        });
}

export const generarToken = (usuario) => {
    return firma({usuario}, true);
}

export const RefreshToken = (usuario) => {
    return firma({usuario}, false);
}