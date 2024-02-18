import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import Room from "../models/room.model";

export async function createRoom(req: Request, res: Response) {
  try {
    const { name, userId, profile } = req.body;

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

    if (!JWT.id === userId) {
      return res.status(403).send("Unauthorized");
    }

    if (!name) {
      return res.status(400).send("Please fill all details");
    }

    const room = await Room.create({
      name,
      profile,
      admin: userId,
      members: [userId],
    });

    return res.status(201).send(room);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
}

export async function getMembers(req: Request, res: Response) {
  try {
    const roomId = req.query.roomId as string;

    if (!roomId) {
      return res.status(400).send("Please fill all details");
    }

    const room = await Room.findById(roomId).populate("members");

    if (!room) {
      return res.status(404).send("Room not found");
    }

    return res.status(200).send(room.members);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
}

export async function getAdminMember(req: Request, res: Response) {
  try {
    const roomId = req.query.roomId as string;

    if (!roomId) {
      return res.status(400).send("Please fill all details");
    }

    const room = await Room.findById(roomId).populate("admin");

    if (!room) {
      return res.status(404).send("Room not found");
    }

    return res.status(200).send(room.admin);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
}

export async function getRoom(req: Request, res: Response) {
  try {
    const roomId = req.query.roomId as string;

    if (!roomId) {
      return res.status(400).send("Please fill all details");
    }

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).send("Room not found");
    }

    return res.status(200).send(room);
  } catch (error) {
    console.log(error);
  }
}

export async function getRooms(req: Request, res: Response) {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      return res.status(400).send("Please fill all details");
    }

    const rooms = await Room.find({ members: userId });

    return res.status(200).send(rooms);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
}

export async function deleteRooms(req: Request, res: Response) {
  try {
    const roomId = req.body.roomId as string;
    const userId = req.body.userId as string;

    if (!roomId || !userId) {
      return res.status(400).send("Please fill all details");
    }

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).send("Room not found");
    }

    if (room.admin.toString() !== userId) {
      return res.status(403).send("Forbidden");
    }

    await Room.deleteOne({ _id: roomId });

    return res.status(200).send("Room deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
}

export const addMember = async (req: Request, res: Response) => {
  try {
    const roomId = req.body.roomId as string;
    const userId = req.body.userId as any;

    if (!roomId || !userId) {
      return res.status(400).send("Please fill all details");
    }

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).send("Room not found");
    }

    if (room.members.includes(userId)) {
      return res.status(400).send("User already in room");
    }

    room.members.push(userId);

    await room.save();

    return res.status(200).send("User added to room");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
};

export const editRoom = async (req: Request, res: Response) => {
  try {
    const roomId = req.body.roomId as string;
    const userId = req.body.userId as string;
    const name = req.body.name as string;
    const profile = req.body.profile as string;

    if (!roomId || !userId || !name) {
      return res.status(400).send("Please fill all details");
    }

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).send("Room not found");
    }

    if (room.admin.toString() !== userId) {
      return res.status(403).send("Forbidden");
    }

    room.name = name;

    if (profile) room.profile = profile;

    await room.save();

    return res.status(200).send("Room updated");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
};

export const removeMember = async (req: Request, res: Response) => {
  try {
    const roomId = req.body.roomId as string;
    const userId = req.body.userId as string;

    if (!roomId || !userId) {
      return res.status(400).send("Please fill all details");
    }

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).send("Room not found");
    }

    if (room.admin.toString() === userId) {
      return res.status(403).send("Forbidden");
    }

    room.members = room.members.filter(
      (member) => member.toString() !== userId
    );

    await room.save();

    return res.status(200).send("User removed from room");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
};

export const leaveRoom = async (req: Request, res: Response) => {
  try {
    const roomId = req.body.roomId as string;
    const userId = req.body.userId as string;

    if (!roomId || !userId) {
      return res.status(400).send("Please fill all details");
    }

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).send("Room not found");
    }

    if (room.admin.toString() === userId) {
      return res.status(403).send("Forbidden");
    }

    room.members = room.members.filter(
      (member) => member.toString() !== userId
    );

    await room.save();

    return res.status(200).send("User removed from room");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
};
