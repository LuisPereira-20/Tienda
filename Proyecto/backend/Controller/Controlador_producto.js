import producto from "../Model/Modelo_producto.js";
import Categorias from "../Model/Modelo_categorias.js";
import {regex, validar} from "../Tools/validacion.js";
import opciones from "../Tools/opciones.js";

export const getProductos = async (req, res) => {
    try {
    opciones.page = (req.query.page) || 1;
    opciones.limit = (req.query.limit) || 12;
    const Productos = await producto.paginate({eliminado : false} , opciones);
    res.status(200).json(Productos);
}  catch (error) {
    console.log(error);
    res.status(500).json({ message : error.message});
}
}

export const getProducto = async (req, res) => {
    try {
    const Producto = await producto.paginate({_id : req.params.id, eliminado : false}, opciones);
    res.status(200).json(Producto);
}  catch (error) {
    res.status(400).json({ message : error.message});
}
}

export const postProducto = async (req, res) => {
    try {
        console.log(req.body);
        if (!regex.nombre.test(req.body.nombre)){
            return res.status(500) .json({ error : "El nombre no es valido" });
        }
            
        if  (!regex.descripcion.test(req.body.descripcion)){
            return res.status(500) .json({ error : "La descripcio no es valida" });
        }
        console.log(req.body.categoria);
        const categoria_Existente = await Categorias.findById(req.body.categoria);
       if (!categoria_Existente){
            return res.status(404).json({ error : "La categoria no existe" });
       }
       req.body.categoria = categoria_Existente._id;

        const Product= new producto(req.body);
        await Product.save();
        const paginated = await producto.paginate({id : producto._id, eliminado : false}, opciones);
        res.status(200).json(paginated);} 
        catch (error) {
        console.log(error);
        res.status(500).json({ message : error.message});
        }
}

export const submitImg = async (req, res) => {
    try {
        console.log(req.files);
        if(req.files.length === 0){
        return res.status(500).json({message: "imagen no encontrada"});
    }
    const imgArray = [];
    req.files.map((file) => {
        if(file.mimetype !== "image/png" && file.mimetype !== "image/jpg" && file.mimetype !== "image/jpeg"){
            return res.status(400).json({message: `image, ${file.filename}, no es valida, solamentepng, jpg y jpeg`});
        }
        if(file.size > 5000000 || file.size === 0){
            return res.status(400).json({message: `image, ${file.filename}, no es valida, el tamaño debe ser maximo de 5MB y no estar vacio`});
        }
        imgArray.push(file.path);
    });
        const product = await producto.findByIdAndUpdate({_id: req.params.id, eliminado: false},
            {images: imgArray},
            {new: true});
        const paginated = await producto.paginate({_id: producto._id, eliminado: false}, opciones);
        res.status(201).json(paginated);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
export const editarProducto = async (req, res) => {
    try{
        req.body.fechaActualizacion = Date.now();
        if (!regex.nombre.test(req.body.nombre)){
            return res.status(400).json({ error : "El nombre no es valido" });
    }
    if  (!regex.descripcion.test(req.body.descripcion)){
        return res.status(400).json({ error : "La descripcion no es valida" });
    }
    const producto_paginate = await producto.paginate({_id : req.params.id, eliminado : false}, opciones);
    res.status(200).json(producto_paginate);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message});
    }
}

export const eliminarProducto = async (req, res) => {
    try {
        const Producto = await producto.findByIdAndUpdate({ _id : req.params.id, eliminado : false},
            {eliminado : true, fechaEliminacion : Date.now()}, 
            {new : true});
        const producto_paginate = await producto.paginate({_id : Producto._id, eliminado : false}, opciones);
        res.status(200).json(producto_paginate);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message});
    }
}

