import {Router} from "express"
import express from "express"
import usuarioController from "../controller/usuario.controller.js"
import { validate } from "../middleware/validator.middleware.js"
import { deleteUsuarioValidator, postUsuarioValidator } from "../validator/user.validator.js"

const router = Router()

router.use(express.json())

//Usuarios Registrados
router.get("/get",usuarioController.getUsuario)

//Subir un nuevo usuario
router.post("/post", validate(postUsuarioValidator) ,usuarioController.postUsuario)

//Subir múltiples usuarios
router.post("/postMultiple", usuarioController.postUsuarioMultiple)

//Actualizar el saldo de un usuario específico
router.put("/updateSaldo/:id", usuarioController.updateSaldo)

//Buscar usuarios por saldo
router.get("/search/:saldo", usuarioController.searchUsuario)

//Obtener país y correo de todos los usuarios
router.get("/usuarioPaisCorreo", usuarioController.usuarioPaisCorreo)

//Eliminar un usuario específico por ID
router.delete("/delete/:id", validate(deleteUsuarioValidator), usuarioController.deleteUsuario)

//Obtener el total apostado por un usuario específico
router.get("/totalApostado/:id", usuarioController.totalApostado)

//Obtener los usuarios con mayor ganancia
router.get("/usuariosMayorGanancia", usuarioController.getUsuariosMayorGanancia)

export default router;



