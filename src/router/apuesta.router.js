import { Router } from "express";
import express from "express";
import apuestaController from "../controller/apuesta.controller.js";

const router = Router();

router.use(express.json());

router.get("/get", apuestaController.getApuesta);
router.get("/get/usuario/:usuarioId", apuestaController.getApuestaPorUsuario);
router.post("/post", apuestaController.postApuesta);
router.post("/postMultiple", apuestaController.postApuestaMultiple);
router.put("/update/:id/estado", apuestaController.actualizarEstadoApuesta);
router.get("/por-deporte/:nombre", apuestaController.porDeporte)
router.get('/getLookup', apuestaController.getLookup)

/* Consulta en curso solo deporte y posible ganacia*/

router.get("/en-curso", apuestaController.getEnCurso)


export default router;