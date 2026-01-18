import { WebSocketServer } from "ws"
import jwt, { JwtPayload } from "jsonwebtoken"
import {SECRET_TOKEN} from "@repo/backendcommon/secret"

const wss = new WebSocketServer({port:8080})

wss.on('connection',function connection(ws,request){
    const url = request.url
    if (!url) {
        return;
    }

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || ""
    const decoded = jwt.verify(token,SECRET_TOKEN)

    if (typeof decoded === "string") {
        ws.close()
        return;
    }

    if (!decoded || !decoded.userId) {
        ws.close()
        return
    }
    ws.on('message',function message(data) {
        ws.send('pong')
    })
})

console.log("server is running on port 8080")