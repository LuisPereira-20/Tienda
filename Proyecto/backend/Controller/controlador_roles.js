import {regex, validar} from "../Tools/validacion.js";
import opciones from "../Tools/opciones.js";
import Rol from "../Model/modelo_rol.js";

export const getRoles = async (req, res) => {
    try {
        opciones.page = (req.query.page) || 1;
        opciones.limit = (req.query.limit) || 2;
        const Roles = await Rol.paginate({eliminado : false} , opciones);
        res.status(200).json(Roles);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : error.message});
    }
}

export const getRol = async (req, res) => {
    try {
    const role = await Rol.paginate({_id: req.params.id, eliminado: false}, opciones);
    res.status(200).json(role);
} catch (error) {
    console.log(error);
    res.status(500).json({ error : error.message});
}
}

export const postRol = async (req, res) => {
    try { 
        if (!regex.nombre.test(req.body.nombre)){
            return res.status(400) .json({ error : "El nombre no es valido" });
        }
        const role = new Rol(req.body);
        await Rol.save();
        res.status(200).json(role);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message});
    }
}

export const editarRol = async (req, res) => {
    try{
        req.body.fechaActualizacion = Date.now();
        if (!regex.nombre.test(req.body.nombre)){
            return res.status(400).json({ error : "El nombre no es valido" });
        }
        const rol = await Rol.findByIdAndUpdate({ _id : req.params.id, eliminado : false},
            req.body, 
            {new : true});
        const Rol_paginate = await Rol.paginate({_id : rol.id, eliminado : false}, opciones);
        res.status(200).json(Rol_paginate);
        console.log(Rol_paginate);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message});
    }
}

export const deleteRol = async (req, res) => {
    try{
        const rol = await Rol.findByIdAndUpdate({ _id : req.params.id, eliminado : false},
            {eliminado : true, fechaEliminacion : Date.now()},
            {new : true});
        res.status(201).json(rol);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message});
    }
}
