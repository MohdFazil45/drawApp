import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "@repo/backendcommon/secret";

export function middleware(req:Request, res:Response, next:NextFunction) {
    const token = req.headers["authorization"] ?? "";
    const decodedInformation = jwt.verify(token, SECRET_TOKEN)
    if (typeof decodedInformation === "string") {
        return
    }

    if (decodedInformation) {
        //@ts-ignore
        req.userId = decodedInformation.userId
        next()
    } else {
        res.status(403).json({
            error:"Unauthorized"
        })
    }
}