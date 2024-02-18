import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import Room from "../models/room.model";
import Message from "../models/message.model";

export async function getMessages(req: Request, res: Response) {
  try {
    const { roomId, userId } = req.body;
    let token = req.headers.authorization;
    token = token?.split(" ")[1];

    if (!token) {
      return res.status(403).send("Unauthorized");
    }

    if (!userId) {
      return res.status(403).send("Forbidden");
    }

    const JWT: any = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as string
    );

    if (JWT.id !== userId) {
      return res.status(403).send("Forbidden");
    }

    if (!roomId) {
      return res.status(400).send("Please fill all details");
    }

    const room = await Room.findById(roomId).populate("messages");

    if (!room) {
      return res.status(404).send("Room not found");
    }

    if (!room.members.includes(userId)) {
      return res.status(403).send("Forbidden");
    }

    const messages = await Message.find({
      roomId,
    })
      .sort({ createdAt: "asc" })
      .populate("senderId");

    return res.status(200).send(messages);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
}

export async function createMessage(req: Request, res: Response) {
  try {
    const { roomId, userId, text } = req.body;
    let token = req.headers.authorization;
    token = token?.split(" ")[1];

    if (!token) {
      return res.status(403).send("Unauthorized");
    }

    if (!userId) {
      return res.status(403).send("Forbidden");
    }

    const JWT: any = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as string
    );

    if (JWT.id !== userId) {
      return res.status(403).send("Forbidden");
    }

    if (!roomId || !text) {
      return res.status(400).send("Please fill all details");
    }

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).send("Room not found");
    }

    if (!room.members.includes(userId)) {
      return res.status(403).send("Forbidden");
    }

    const message = await Message.create({
      message: text,
      roomId,
      senderId: userId,
    });

    room.messages.push(message as any);
    await room.save();

    return res.status(201).send(message);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
}

export async function deleteMessage(req: Request, res: Response) {
  try {
    const { roomId, userId, messageId } = req.body;
    let token = req.headers.authorization;
    token = token?.split(" ")[1];

    if (!token) {
      return res.status(403).send("Unauthorized");
    }

    if (!userId) {
      return res.status(403).send("Forbidden");
    }

    const JWT: any = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as string
    );

    if (JWT.id !== userId) {
      return res.status(403).send("Forbidden");
    }

    if (!roomId || !messageId) {
      return res.status(400).send("Please fill all details");
    }

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).send("Room not found");
    }

    if (!room.members.includes(userId)) {
      return res.status(403).send("Forbidden");
    }

    const messageIndex = room.messages.findIndex(
      (message) => message._id == messageId
    );

    if (messageIndex === -1) {
      return res.status(404).send("Message not found");
    }

    room.messages.splice(messageIndex, 1);
    await room.save();

    return res.status(200).send("Message deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
}
