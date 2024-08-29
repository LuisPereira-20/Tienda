import { verificarToken } from "./verificar.js";
import Token from "./getTokenH.js";
import Rol from "../Model/modelo_rol.js";


export const autenticar = async (req, res, next) => {
    const token = Token(req);
    if (!token) {
        return res.status(401).json({ error : "No hay token" });
    }
    const decodificado = verificarToken(token);
    if (!decodificado) {
        console.log("Token invalido", decodificado);
        return res.status(401).json({ error : "Token invalido" });
    }
    req.usuario = {...decodificado.Usuario};
    next();
}

export const autenticarRol = async (req, res, next) => {
    const role = await Rol.findById(req.Usuario.Rol);
    if (!role) {
        console.log("No hay rol", req.Usuario.Rol);
        return res.status(401).json({ error : "No hay rol" });
    }
    if (Rol.nombre !== "Administrador") {
        console.log("No autorizado", Rol.nombre);
        return res.status(401).json({ error : "No autorizado" });
    }
    next();
}