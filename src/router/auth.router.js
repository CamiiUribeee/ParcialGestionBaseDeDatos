import { Router } from "express"
import { auth } from "../controller/auth.controller.js";

const router = Router();

router.post("/",auth)

export default router;