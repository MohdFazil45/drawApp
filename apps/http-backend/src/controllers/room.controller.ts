import { CreateRoomSchema } from "@repo/common/types";
import { prisma } from "@repo/db/client";
import { Request, Response } from "express";

export const createRoom = async (req:Request,res:Response)=>{
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
            data: {
            slug: parseData.data.slug,
            adminId: userId,
            },
        });
    
        res.status(201).json({
            roomId: room.id,
        });
        } catch (error) {
        return res.status(401).json({
            error: "Slug already used",
        });
        }
    } catch (error) {
        console.log(error);
    }
}

export const getRoom = async (req:Request, res:Response) => {
  try {
    //@ts-ignore
    const userID = req.userId;
    const response = await prisma.room.findMany({
      where: {
        adminId: userID,
      },
    });

    if (!response) {
      return res.status(404).json({
        error: "Room doesn't exist",
      });
    }

    return res.status(201).json({
      room: response,
    });
  } catch (error) {}
}

export const deleteRoom =  async (req:Request, res:Response) => {
  const roomId = Number(req.params.id);
  //@ts-ignore
  const userId = req.userId;

  await prisma.chat.deleteMany({
    where: {
      roomId: roomId,
    },
  });

  await prisma.room.delete({
    where: {
      adminId: userId,
      id: roomId,
    },
  });

  return res.status(200).json({
    message: "Deleted succesfully",
  });
}

export const allChatsDelete = async (req:Request,res:Response) => {
  try {
    const roomId = Number(req.params.roomId)

  if (!roomId) {
    return res.status(404).json({
      error:"RoomId doesn't exist"
    })
  }

  await prisma.chat.deleteMany({
    where:{
      roomId:roomId
    }
  })

  res.status(200).json({
    message:"All chats deleted"
  })
  } catch (error) {
    console.log(error)
  }
}

export const fetchMessage =  async (req:Request, res:Response) => {
  try {
    const roomId = Number(req.params["roomId"]);
    const messages = await prisma.chat.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        id: "desc",
      },
      take: 500,
    });
    res.status(200).json({
      messages: messages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to fetch messages",
    });
  }
}

export const getRoomSlug = async (req:Request, res:Response) => {
  try {
    const slug = req.params.slug;
    const room = await prisma.room.findFirst({
      where: {
        //@ts-ignore
        slug: slug,
      },
    });

    res.status(201).json({
      roomId: room?.id,
    });
  } catch (error) {
    console.log(error);
  }
}