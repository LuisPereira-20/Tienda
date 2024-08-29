import mongoose from "mongoose";

const Schema = mongoose.Schema;

const autenticacionSchema = new Schema({
    token : {
        type : String,
        required : true
    },
})

    const autenticacion = mongoose.model('autenticacion', autenticacionSchema)

    export default autenticacion