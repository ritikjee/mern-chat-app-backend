import { Router } from "express";
import {
  createMessage,
  deleteMessage,
  getMessages,
} from "../controllers/message.controller";

const messageRouter = Router();

messageRouter.post("/create-message", createMessage);
messageRouter.post("/get-messages", getMessages);
messageRouter.delete("/delete-message", deleteMessage);

export default messageRouter;
