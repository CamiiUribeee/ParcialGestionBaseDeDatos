import {Router} from "express"

//import { getApuesta, save } from "../controller/apuesta.controller.js";
import apuestaController from "../controller/apuesta.controller.js";

const router = Router();


router.get("/apuesta", (req,res) =>{
    res.send("Hola apuesta")
} )

router.post("/save", apuestaController.save_dos)
    

router.get("/get", apuestaController.getApuesta)

router.get("/update", apuestaController.update)


router.get('/hset', apuestaController.hset)

router.get('/delete', apuestaController.deleteTwo)


router.get('/getHash', apuestaController.getHash)



export default router;