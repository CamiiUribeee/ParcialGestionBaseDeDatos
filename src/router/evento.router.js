import {Router} from "express"
import express from "express"
import eventoController from "../controller/evento.controller.js"

import { validate } from "../middleware/validator.middleware.js"
import { postEventoValidator, deleteEventoValidator } from "../validator/evento.validator.js"
const router = Router()

router.use(express.json())

//Eventos Registrados
router.get("/get",eventoController.getEvento)

//Subir un nuevo evento
router.post("/post", validate(postEventoValidator), eventoController.postEvento)

//Subir múltiples eventos
router.post("/postMultiple", eventoController.postEventoMultiple)

//Buscar eventos por deporte
router.get("/search/:evento", eventoController.SearchEvento)

//Eventos donde la cuota local sea mayor a 2.0
router.get("/eventoCuota", eventoController.eventoCuota)

//Modificar la cuota visitante de un evento específico
router.put("/modificarCuota/:id", eventoController.modificarCuota)

//Eliminar eventos finalizados
router.delete("/delete",  eventoController.deleteEventoMultiple)

//Eliminar un evento específico por ID
router.delete("/deleteEvento/:id", validate(deleteEventoValidator), eventoController.deleteEvento)

//Obtener el promedio de las cuotas de todos los eventos
router.get("/promedioCuota", eventoController.promedioCuota)

export default router;