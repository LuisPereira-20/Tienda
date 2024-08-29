import { Router } from "express";
const router = Router();
import { getCategorias, getCategoria, postCategoria, editarCategoria, deleteCategoria} from "../Controller/controlador_categoria.js";

router.get("/categorias",  getCategorias);
router.get("/categorias/:id",  getCategoria);
router.post("/categorias",  postCategoria);
router.patch("/categorias/:id",  editarCategoria);
router.delete("/categorias/:id",  deleteCategoria);

export default router