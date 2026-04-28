import {Router} from "express"
import express from "express"
import usuarioController from "../controller/usuario.controller.js"
import { validate } from "../middleware/validator.middleware.js"
import { deleteUsuarioValidator, postUsuarioValidator } from "../validator/user.validator.js"

const router = Router()

router.use(express.json())
router.get("/get",usuarioController.getUsuario)
router.post("/post", validate(postUsuarioValidator) ,usuarioController.postUsuario)
router.post("/postMultiple", usuarioController.postUsuarioMultiple)
router.put("/updateSaldo/:id", usuarioController.updateSaldo)
router.get("/search/:saldo", usuarioController.searchUsuario)
router.get("/usuarioPaisCorreo", usuarioController.usuarioPaisCorreo)
router.delete("/delete/:id", validate(deleteUsuarioValidator), usuarioController.deleteUsuario)
router.get("/totalApostado/:id", usuarioController.totalApostado)

export default router;



