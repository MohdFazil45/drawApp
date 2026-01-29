import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { middleware } from "./authMiddleware.js";
import { SECRET_TOKEN } from "@repo/backendcommon/secret";
import cors from "cors"
import {
  CreateUserSchema,
  CreateRoomSchema,
  SigninSchema,
} from "@repo/common/types";
import { prisma } from "@repo/db/client";
const app = express();
const PORT = 4000;
app.use(cors())

app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  try {
    const parseData = CreateUserSchema.safeParse(req.body);

    if (!parseData.success) {
      return res.status(400).json({
        error: "Incorrect inputs",
      });
    }
    const email = parseData.data.email;
    const password = parseData.data.password;
    const name = parseData.data.name;

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      return res.status(409).json({
        error: `User with email:- ${email} already exists`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "SignUp successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/v1/signin", async (req, res) => {
  try {
    const siginData = SigninSchema.safeParse(req.body);

    if (!siginData.success) {
      return res.status(402).json({
        error: "Incorrect input",
      });
    }

    const email = siginData.data.email;
    const password = siginData.data.password;

    const checkUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!checkUser) {
      return res.status(404).json({
        error: `User with email:- ${email} does not exists`,
      });
    }

    if (!checkUser || !checkUser.password) {
      return res.status(404).json({
        error: "user not exist",
      });
    }

    const hashedPassword = await bcrypt.compare(password, checkUser.password);

    if (hashedPassword) {
      const token = jwt.sign(
        {
          userId: checkUser.id,
        },
        SECRET_TOKEN,
      );
      return res.status(201).json({
        token,
      });
    } else {
      res.status(403).json({
        msg: "incorrect credential",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/v1/create-room", middleware, async (req, res) => {
  try {
    const parseData = CreateRoomSchema.safeParse(req.body);

    if (!parseData.success) {
      return res.status(402).json({
        error: "Incorrect inputs",
      });
    }
    //@ts-ignore
    const userId = req.userId;
    try {
      const room = await prisma.room.create({
      data:{
        slug:parseData.data.slug,
        adminId:userId
      }
    })

    res.status(201).json({
      roomId :room.id
    })
    } catch (error) {
      return res.status(401).json({
        error:"Slug already used"
      })
    }
  } catch (error) {
    console.log(error)
  }
});

app.get("/api/v1/chats/:roomId", async (req, res) => {
  try {
    const roomId = Number(req.params["roomId"])
    const messages = await prisma.chat.findMany({
      where:{
        roomId:roomId
      },
      orderBy:{
        id:"desc"
      },
      take: 500
    })
    res.status(200).json({
      messages:messages
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "Failed to fetch messages"
    })
  }
});

app.get("/api/v1/room/:slug",async (req,res)=>{
 try {
   const slug = req.params.slug
  const room = await prisma.room.findFirst({
    where:{
      //@ts-ignore
      slug:slug
    }
  })

  res.status(201).json({
    roomId:room?.id
  })
 } catch (error) {
  console.log(error)
 }
})

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
  