import express from "express";
import userRouter from "./routes/auth.routes.js"
import roomRouter from "./routes/room.route.js"
import { middleware } from "./middlewares/authMiddleware.js";
import cors from "cors";

const app = express();
const PORT = 4000;
app.use(cors());

app.use(express.json());

app.use("/api/v1", userRouter);
app.use("/api/v1", userRouter);

app.use("/api/v1", middleware, roomRouter);
app.use("/api/v1", middleware,roomRouter );
app.use("/api/v1", middleware,roomRouter);
app.use("/api/v1",middleware,roomRouter)
app.use("/api/v1",middleware,roomRouter);
app.use("/api/v1,",middleware,roomRouter );

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
