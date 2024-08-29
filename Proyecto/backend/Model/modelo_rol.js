/*
un rol tiene los siguientes atributos:
    - Nombre (minimo 2 caracteres, maximo de 50, no puede contener caracteres especiales, admite espacios, obligatorio)
    -Fecha de creacion (obligatorio y por defecto la fecha actual)
    -Fecha de actualizacion (default: date.now)
    -Fecha de eliminacion (default: null)
    -Eliminado (default: false, boleano)
*/
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { regex, validar } from "../Tools/validacion.js";
const Schema = mongoose.Schema;
const rolSchema = new Schema({
    nombre : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 50,
        match : regex.nombre
    },
    fechaCreacion : {
        type : Date,
        default : Date.now
    },
    fechaActualizacion : {
        type : Date,
        default : Date.now
    },
    fechaEliminacion : {
        type : Date,
        default: null
    },
    eliminado : {
        type : Boolean,
        default : false
    }
});
rolSchema.plugin(mongoosePaginate);
const Rol = mongoose.model("Rol", rolSchema);
export default Rol;