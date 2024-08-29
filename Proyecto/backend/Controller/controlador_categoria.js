import {regex, validar} from "../Tools/validacion.js";
import opciones from "../Tools/opciones.js";
import Categorias from "../Model/Modelo_categorias.js";

export const getCategorias = async (req, res) => {
    try {
        opciones.page = (req.query.page) || 1;
        opciones.limit = (req.query.limit) || 12;
        const categoria = await Categorias.paginate({eliminado : false} , opciones);
        res.status(200).json(categoria);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message});
    }
}

export const getCategoria = async (req, res) => {
    try {
    const categoria = await Categorias.paginate({_id: req.params.id, eliminado : false}, opciones);
    console.log(req.params.id); 
    res.status(200).json(categoria);
} catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message});
}
}

export const postCategoria = async (req, res) => {
    try {
        if (!regex.nombre.test(req.body.nombre)){
            return res.status(400).json({ error : "El nombre no es valido" });
        }
        const Categoria = new Categorias(req.body);
        await Categoria.save();
        res.status(200).json(Categoria);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message});
    }
}

export const editarCategoria = async (req, res) => {
    try{
        req.body.fechaActualizacion = Date.now();
        if (!regex.nombre.test(req.body.nombre)){
            return res.status(400).json({ error : "El nombre no es valido" });
        }
        const categoria = await Categorias.findByIdAndUpdate({ _id : req.params.id, eliminado : false}, req.body, {new : true});
        const categoria_paginate = await Categorias.paginate({id : categoria.id, eliminado : false}, opciones);
        res.status(200).json(categoria_paginate);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : error.message});
    }
}

export const deleteCategoria = async (req, res) => {
    try{
        req.body.eliminado = true;
        const categories = await Categorias.findByIdAndUpdate({ _id : req.params.id, eliminado : false}, 
            {eliminado : true, fechaEliminacion : Date.now()}, 
            {new : true});
        const categoria_paginate = await Categorias.paginate({id : categories.id, eliminado : false}, opciones);
        console.log(categories.id);
        res.status(200).json(categoria_paginate);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message});
    }
}