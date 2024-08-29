/*
Un Usuario tiene los siguientes atributos:
    - Nombre
    - Apellido
    - Email
    - Contraseña
    - Rol
    -Telefono
    -imagen
    -fecha de creacion
    -fecha de actualizacion
    -Fecha de eliminacion
    -Eliminado
    -Compras
    -Carrito de compras
*/
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { regex, validar } from "../Tools/validacion.js";
import { generarToken, RefreshToken } from "../Authentication/generar.js";
import autenticacion from "./Modelo_Autenticacion.js";
import InformacionUsuario from "../Tools/Informacion_usuario.js";
const Schema = mongoose.Schema;
const usuarioSchema = new Schema({
    nombre : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 50,
        match : regex.nombre
    },
    apellido : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 50,
        match : regex.apellido
    },
    correo : {
        type : String,
        required : true,
        unique : true,
        match : regex.correo
    },
    contraseña : {
        type : String,
        required : true,
        maxLength : 200
    },
    telefono : {
        type : String,
        required : true
    },
    rol : {type: Schema.Types.ObjectId, ref:'Rol', default: null},
    
    imagen: {
        type : Array,
        
    },
    fechaCreacion: {
        type : Date,
        default : Date.now,
        inmutable : true
    },
    fechaActualizacion: {
        type : Date,
        default : Date.now
    },
    fechaEliminacion: {
        type : Date,
        default : null
    },
    eliminado: {
        type : Boolean,
        default : false
    },
    compras: {
        type : [Schema.Types.ObjectId], ref:'Compra',
        default : [],
    },
    carrito: {
        type : Array,
        default : []
    }
});
usuarioSchema.plugin(mongoosePaginate);

usuarioSchema.methods.crearAccesoToken = function () {
    return generarToken(InformacionUsuario(this));
  };
    usuarioSchema.methods.createRefreshToken = async function () {
    const refreshToken = RefreshToken(InformacionUsuario(this));
    try {
        await new autenticacion({ token: refreshToken }).save();
    } catch (error) {
        console.log(error);
    }
    return refreshToken;
    };
const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario