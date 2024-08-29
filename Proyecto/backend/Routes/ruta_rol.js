import { Router } from "express";
const router = Router();

import { getRoles, getRol, postRol, editarRol, deleteRol} from "../Controller/controlador_roles.js";

router.get("/roles",  getRoles);
router.get("/roles/:id",  getRol);
router.post("/roles",  postRol);
router.patch("/roles/:id",  editarRol);
router.delete("/roles/:id",  deleteRol);

export default router;