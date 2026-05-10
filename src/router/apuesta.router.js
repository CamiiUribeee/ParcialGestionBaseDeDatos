import { Router } from "express";
import express from "express";
import apuestaController from "../controller/apuesta.controller.js";

const router = Router();

router.use(express.json());


//Apuestas Registradas
router.get("/get", apuestaController.getApuesta);

//Apuestas por usuario
router.get("/get/usuario/:usuarioId", apuestaController.getApuestaPorUsuario);

//Registrar una nueva apuesta
router.post("/post", apuestaController.postApuesta);

//Registrar múltiples apuestas
router.post("/postMultiple", apuestaController.postApuestaMultiple);

//Actualizar el estado de una apuesta
router.put("/update/:id/estado", apuestaController.actualizarEstadoApuesta);

//Consulta de apuestas por deporte
router.get("/por-deporte/:nombre", apuestaController.porDeporte)

//Consulta con $lookup para mostrar detalles de usuario y evento en cada apuesta
router.get('/getLookup', apuestaController.getLookup)

/* Consulta en curso solo deporte y posible ganacia*/

router.get("/en-curso", apuestaController.getEnCurso)


export default router;