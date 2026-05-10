import { Router } from "express";
import express from "express";
import apuestaController from "../controller/apuesta.controller.js";
import { validate } from "../middleware/validator.middleware.js";
import { postApuestaValidator, deleteApuestaValidator, updateApuestaValidator } from "../validator/apuesta.validator.js";

const router = Router();

router.use(express.json());

// Apuestas registradas
router.get("/get", apuestaController.getApuesta);

// Apuestas por usuario
router.get("/get/usuario/:usuarioId", apuestaController.getApuestaPorUsuario);

// Registrar una nueva apuesta
router.post("/post", validate(postApuestaValidator), apuestaController.postApuesta);

// Registrar múltiples apuestas
router.post("/postMultiple", apuestaController.postApuestaMultiple);

// Actualizar el estado de una apuesta
router.put("/update/:id/estado", validate(updateApuestaValidator), apuestaController.actualizarEstadoApuesta);

// Consulta de apuestas por deporte
router.get("/por-deporte/:nombre", apuestaController.porDeporte);

// Consulta con $lookup para mostrar detalles de usuario y evento en cada apuesta
router.get('/getLookup', apuestaController.getLookup);

// Consulta apuestas en curso con deporte y posible ganancia
router.get("/en-curso", apuestaController.getEnCurso);

export default router;