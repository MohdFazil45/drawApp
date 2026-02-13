import express, { Router } from "express"
import { signin, signup } from "../controllers/auth.controller.js"
const router:Router = express.Router()

router.post("/signup",signup)
router.post("/signin",signin)


export default router