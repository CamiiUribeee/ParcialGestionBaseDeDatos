import {Router} from "express"
import express from "express"
import eventoController from "../controller/evento.controller.js"
const router = Router()

router.use(express.json())
router.get("/get",eventoController.getEvento)
router.post("/post",eventoController.postEvento)
router.post("/postMultiple", eventoController.postEventoMultiple)
router.get("/search/:evento", eventoController.SearchEvento)
router.get("/eventoCuota", eventoController.eventoCuota)
router.put("/modificarCuota/:id", eventoController.modificarCuota)
router.delete("/delete", eventoController.deleteEventoMultiple)
router.delete("/deleteEvento/:id",eventoController.deleteEvento)
router.get("/promedioCuota", eventoController.promedioCuota)
export default router;