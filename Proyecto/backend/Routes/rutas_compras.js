import { Router } from "express";
const router = Router();
import { getCompras, getComprasId, postCompras, editarCompras, borrarCompras} from "../Controller/controlador_compra.js";

router.get("/compras",  getCompras);
router.get("/compras/:id",  getComprasId);
router.post("/compras",  postCompras);
router.patch("/compras/:id",  editarCompras);
router.delete("/compras/:id",  borrarCompras);

export default router;