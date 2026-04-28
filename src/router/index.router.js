import { Router } from 'express';
import mongo from './mongo.router.js';
import UsuarioRouter from './usuario.router.js';
import EventoRouter from "./evento.router.js";
import ApuestaRouter from "./apuesta.router.js";
import AuthRouter from "./auth.router.js";
import { sendEmail } from '../services/email.service.js';

const router = Router();
// router.use(ApuestaRoute);
// router.use(mongo);
router.use( "/api//usuario", UsuarioRouter);
router.use("/api/evento", EventoRouter)
router.use("/api/apuesta", ApuestaRouter)
router.use("/auth",AuthRouter)


router.use("/email", async (req,res) =>{
    const salida = await sendEmail('123456')
    res.status(200).json({
        msn: 'enviado',
        salida
    })
})

export default router;
