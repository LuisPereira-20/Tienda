/*
una categoria tiene los siguientes atributos:
    -nombre (minimo 2 caracteres, maximo de 50, no puede contener caracteres especiales, admite espacios, obligatorio)
    -Fecha de creacion (obligatorio y por defecto la fecha actual)
    -Fecha de actualizacion (default: date.now)
    -Fecha de eliminacion (default: null)
    -Eliminado (default: false, boleano)
*/
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { regex, validar } from "../Tools/validacion.js";
import InformacionUsuario from "../Tools/Informacion_usuario.js";
const Schema = mongoose.Schema;
const categoriaSchema = new Schema({
    nombre : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 50,
        match : regex.nombre,
        inmutable : true
    },
    fechaCreacion : {
        type : Date,
        default : Date.now,
        Inmutable : true
    },
    fechaActualizacion : {
        type : Date,
        default : Date.now
    },
    fechaEliminacion : {
        type : Date,
        default : null
    },
    eliminado : {
        type : Boolean,
        default : false
    }
});
categoriaSchema.plugin(mongoosePaginate);
const Categorias = mongoose.model("Categorias", categoriaSchema);

export default Categorias;