import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {middleware} from "./authMiddleware"
import { SECRET_TOKEN } from "@repo/backendcommon/secret";
import {CreateUserSchema, CreateRoomSchema, SigninSchema} from "@repo/common/types"
const app = express();
const PORT = 4000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

app.use(express.json());

interface User {
  email: string;
  name: string;
  password: string;
}

const USERS: Array<User> = [];

app.post("/api/v1/signup", async (req, res) => {
  try {
    const parseData = CreateUserSchema.safeParse(req.body)

    if (!parseData.success) {
      return res.status(400).json({
          error:"Incorrect inputs"
      })
    }

    const email = parseData.data.email
    const password = parseData.data.password
    const name = parseData.data.name

    const userAlreadyExists = USERS.find((user) => user.email === email);

    if (userAlreadyExists) {
      return res.status(409).json({
        error: `User with email:- ${email} already exists`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    USERS.push({
      email,
      name,
      password: hashedPassword,
    });

    res.status(201).json({
      USERS,
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
        error:"Incorrect input"
      })
    }

    const email = siginData.data.email
    const password = siginData.data.password

    const checkUser = USERS.find((user) => user.email === email);

    if (!checkUser) {
      return res.status(404).json({
        error: `User with email:- ${email} does not exists`,
      });
    }

    const response = await USERS.find((user) => user.email == email);

    if (!response || !response.password) {
      return res.status(404).json({
        error: "user not exist",
      });
    }

    const hashedPassword = await bcrypt.compare(password, response.password);

    if (hashedPassword) {
      const token = jwt.sign(
        {
          name: response.name,
        },
        SECRET_TOKEN,
      );
      return res.status(201).json({
        token
      })
    } else {
      res.status(403).json({
        msg: "incorrect credential",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/v1/create-room", middleware,async (req, res) => {
  res.json({
    roomid:Math.floor(Math.random()*10000)
  })
});

app.get("/api/v1/rooms", async (req, res) => {});
