import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {middleware} from "./authMiddleware"
import { SECRET_TOKEN } from "@repo/backendcommon/secret";
const app = express();
const PORT = 4000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

app.use(express.json());

interface User {
  id: number;
  email: string;
  name: string;
  password: string;
}

const USERS: Array<User> = [];

app.post("/api/v1/signup", async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const userAlreadyExists = USERS.find((user) => user.email === email);

    if (userAlreadyExists) {
      return res.status(409).json({
        error: `User with email:- ${email} already exists`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    USERS.push({
      id:Math.floor(Math.random() * 10),
      email,
      name,
      password: hashedPassword,
    });

    res.status(200).json({
      USERS,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/v1/signin", async (req, res) => {
  try {
    const { email, name, password } = req.body;
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
          id: response.id,
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
