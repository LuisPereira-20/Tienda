import  {Router} from 'express';
import multer from 'multer';
const guardar = multer.diskStorage({
    destination: function (req, file, cb)  {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb)  {
        const uniconombre = Date.now() + '-' + file.originalname;
        cb(null, uniconombre);
    },
});

const upload = multer({ storage: guardar, limits: {files: 1} });
const router  = Router();   

import { getUsuarios, getUsuario, postUsuario, Actualizar_Usuario, Eliminar_Usuario, submitImg} from "../Controller/Controlador_usuario.js";
router.get("/usuarios",  getUsuarios);
router.get("/usuarios/:id",  getUsuario);
router.post("/usuarios",  postUsuario);
router.patch("/usuarios/:id",  Actualizar_Usuario);
router.patch("/usuarios/Img/:id", upload.single("imagen"),  submitImg);
router.delete("/usuarios/:id",  Eliminar_Usuario);

export default router