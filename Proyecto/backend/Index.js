import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
const PORT = 3001;
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/farmamigo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

import Usuarios from "./Routes/ruta_usuario.js";
import Categorias from "./Routes/ruta_categoria.js";
import Productos from "./Routes/ruta_productos.js";
import compras from "./Routes/rutas_compras.js";
import Roles from "./Routes/ruta_rol.js";

app.use(
    Usuarios,
    Categorias,
    Productos,
    compras,
    Roles
)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
