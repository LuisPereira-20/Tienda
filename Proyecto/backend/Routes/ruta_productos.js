import { Router } from "express";
import multer from 'multer';
const almacen = multer.diskStorage({
    destination: function (req, file, cb)  {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb)  {
        const uniconombre = Date.now() + '-' + file.originalname;
        cb(null, uniconombre);
    },
});

const upload = multer({ storage: almacen, limits: {files: 5} });
const router = Router();
import { getProductos, getProducto, postProducto, editarProducto, eliminarProducto, submitImg} from "../Controller/Controlador_producto.js";

router.get("/productos",  getProductos);
router.get("/productos/:id",  getProducto);
router.post("/productos",  postProducto);
router.patch("/productos/:id",  editarProducto);
router.patch("/productos/Img/:id", upload.single("imagen"),  submitImg);
router.delete("/productos/:id",  eliminarProducto);

export default router;