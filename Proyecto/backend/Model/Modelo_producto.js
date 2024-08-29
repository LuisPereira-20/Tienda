/*
un producto tiene los siguientes atributos:
    -nombre (minimo 2 caracteres, maximo de 50, no puede contener caracteres especiales, admite espacios, obligatorio)
    -precio (obligatorio, minimo 0, maximo 1000000)
    -stock (obligatorio, minimo 0, maximo 1000000)
    -imagen 
    -fecha de creacion
    -fecha de actualizacion
    -Fecha de eliminacion
    -Eliminado
    -descripcion (minimo 2 caracteres, maximo de 500, no puede contener caracteres especiales, admite espacios, obligatorio)
    categoria (objectid, ref: 'categoria', default: null)
    descuento (numero, minimo 0, maximo 100)
*/
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { regex, validar } from "../Tools/validacion.js";
const Schema = mongoose.Schema;
const productoSchema = new Schema({
    nombre : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 50,
        match : regex.nombre
    },
    precio : {
        type : Number,
        required : true,
        min : 0,
        max : 1000000
    },
    stock : {
        type : Number,
        required : true,
        min : 0,
        max : 1000000
    },
    imagen : {
        type: [String],
        default: [],
        minLength : 1,
        maxLength : 5
    },
    fechaCreacion : {
        type : Date,
        default : Date.now,
        inmutable : true
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
    },
    descripcion : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 500,
        match : regex.descripcion},
        
    categoria : {type : Schema.Types.ObjectId, ref:'Categorias', default: null},
    descuento : {
        type : Number,
        min : 0,
        max : 100
    }
});
productoSchema.plugin(mongoosePaginate);
const producto = mongoose.model("producto", productoSchema);
export default producto;