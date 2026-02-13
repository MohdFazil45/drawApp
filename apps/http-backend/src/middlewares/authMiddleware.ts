import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "@repo/backendcommon/secret";

export function middleware(req: Request, res: Response, next: NextFunction) {
  try {
    const tokenHeader = req.headers["authorization"]

    if (!tokenHeader) {
      return res.status(401).json({
        error:'No authorization token  provided'
      });    
    }

    if (!tokenHeader.startsWith("Bearer")) {
      return res.status(201).json({
        error: "Authorization header must begin with Bearer",
      });
    }

    const token = tokenHeader.split(" ")[1]!;

    const decodedInformation = jwt.verify(token, SECRET_TOKEN);
    if (typeof decodedInformation === "string") {
      return;
    }

    if (decodedInformation) {
      //@ts-ignore
      req.userId = decodedInformation.userId;
      next();
    } else {
      res.status(403).json({
        error: "Unauthorized",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
