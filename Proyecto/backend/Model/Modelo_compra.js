/*
una compra tiene los siguientes atributos:
    Usuario (objectid, ref: 'usuario', default: null)
    producto (array minimo 1 producto, obligatorio)
    total
    -fecha de compra
    -fecha de creacion
    -fecha de actualizacion
    -Fecha de eliminacion
    -Eliminado
*/
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const Schema = mongoose.Schema;
const compraSchema = new Schema({
    usuario : {
        type : Schema.Types.ObjectId,
        ref : 'Usuario',
        required : true
    },
    productos : [
        {
            idProducto : {type : Schema.Types.ObjectId, ref :'Producto'},
            cantidad : {type : Number, required : true, min : 1},
            subtotal : {type : Number, required : true, min : 1}
        }
    ],
    total : {
        type : Number,
        required : true,
        min : 0
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
    }
});
compraSchema.plugin(mongoosePaginate);
const Compra = mongoose.model("Compra", compraSchema);
export default Compra;