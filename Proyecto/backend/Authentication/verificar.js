import jwt from "jsonwebtoken";
import  "dotenv/config";

const verificarToken = (token) => {
    return jwt .verify(token, process.env.ACESS_TOKEN);
}
const verificarRefresh = (token) => {
    return jwt .verify(token, process.env.REFRESH_TOKEN);
}
export {verificarToken, verificarRefresh}