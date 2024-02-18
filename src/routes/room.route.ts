import { Router } from "express";
import {
  addMember,
  createRoom,
  deleteRooms,
  editRoom,
  getAdminMember,
  getMembers,
  getRoom,
  getRooms,
  leaveRoom,
  removeMember,
} from "../controllers/room.controller";

const roomRouter = Router();

roomRouter.post("/create-room", createRoom);
roomRouter.get("/get-rooms", getRooms);
roomRouter.get("/get-room", getRoom);
roomRouter.post("/invite-member", addMember);
roomRouter.get("/get-members", getMembers);
roomRouter.get("/get-admin-member", getAdminMember);
roomRouter.post("/delete-room", deleteRooms);
roomRouter.post("/edit-room", editRoom);
roomRouter.post("/remove-member", removeMember);
roomRouter.post("/leave-room", leaveRoom);

export default roomRouter;
