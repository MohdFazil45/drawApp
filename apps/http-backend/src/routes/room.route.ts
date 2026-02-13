import express, { Router } from "express"
import { allChatsDelete, createRoom, deleteRoom, fetchMessage, getRoom, getRoomSlug } from "../controllers/room.controller.js"
const router:Router = express.Router()

router.post("/create-room",createRoom)
router.get("/room",getRoom)
router.delete("/room/:id",deleteRoom)
router.delete("/chats/delete/:roomId",allChatsDelete)
router.get("/chats/:roomId",fetchMessage)
router.get("/room/:slug",getRoomSlug)

export default router