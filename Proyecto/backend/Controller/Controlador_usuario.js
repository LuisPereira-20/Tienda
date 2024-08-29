import bcrypt from "bcrypt";
import Usuario from "../Model/modelo_usuario.js";
import Rol from "../Model/modelo_rol.js";
import {regex, validar} from "../Tools/validacion.js";
import opciones from "../Tools/opciones.js"; 

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.paginate({
            eliminado : false
        }, opciones);
        res.status(200).json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message});
    }
}

export const getUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.paginate({_id : req.params.id, eliminado : false}, opciones);
        console.log(req.params.id);
        res.status(200).json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message});
    }
}
        export const postUsuario = async (req, res) => {
            try {
                console.log(req.body);
                const salt = await bcrypt.genSalt(10);
                req.body.contraseña = await bcrypt.hash(req.body.contraseña, salt);
                const roles = await Rol.findById(req.body.rol);
                if (!roles) {
                    return res.status(400).json({ error: "El rol no existe" });
                }
                req.body.rol = roles._id;
                const usuario = new Usuario(req.body);
                await usuario.save();
                const Pagina_Usuario = await Usuario.paginate({_id: usuario._id, eliminado: false}, opciones);
                res.status(200).json(Pagina_Usuario);
            } 
            catch (error) {
                console.log(error);
                res.status(500).json({ message: error.message });
            }
        }
        export const submitImg = async (req, res) => {
            try {
                console.log(req.file);
                    if(req.file === undefined){
                return res.status(400).json({message: "imagen no encontrada"});
                }
            if(req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg"){
                return res.status(400).json({message: `image, ${req.file.filename}, no es valida, solamente png, jpg y jpeg`});
                }
            if(req.file.size > 5000000 || req.file.size === 0){
                return res.status(400).json({message: `image, ${req.file.filename}, no es valida, el tamaño maximo es 5mb y no debe estar vacio`});
                }
                const usuario = await User.findByIdAndUpdate({_id: req.params.id, eliminado: false},
                    {image: req.file.path}, 
                    {new: true});
                const paginatedUsuario = await Usuario.paginate({eliminado: false, _id: usuario._id}, opciones);
                return res.status(201).json(paginatedUsuario);
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: error.message });
            }
          }
        export const Actualizar_Usuario = async (req, res) => {
            try {
                req.body.fechaActualizacion = Date.now();
                if (!regex.nombre.test(req.body.nombre)){
                    return res.status(400) .json({ error : "El nombre no es valido" });
                }
                    
                if  (!regex.apellido.test(req.body.apellido)){
                    return res.status(400) .json({ error : "El apellido no es valido" });
                }
                if (!regex.correo.test(req.body.correo)){
                    return res.status(400) .json({ error : "El correo no es valido" });
                }
                const usuario = await Usuario.findByIdAndUpdate({ _id : req.params.id, deleted : false}, req.body, {new : true});
                const Pagina_Usuario = await Usuario.paginate({id : usuario._id, eliminado : false}, opciones);
                return res.status(200).json(Pagina_Usuario);
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: error.message});
            }
        }
            
            export const Eliminar_Usuario = async (req, res) => {
                try {
                    const usuario = await Usuario.findByIdAndUpdate({ _id : req.params.id, deleted : true},
                        {deleted : true, fechaEliminacion : Date.now()},
                        {new : true});
                    const Pagina_Usuario = await Usuario.paginate({id : usuario._id, eliminado : false}, opciones);
                    return res.status(200).json(Pagina_Usuario);
                } catch (error) {
                    res.status(404).json({ error : error.message});
                }
            }