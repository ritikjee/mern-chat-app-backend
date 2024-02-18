import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import { connect } from "./lib/db";
import authRouter from "./routes/auth.route";
import roomRouter from "./routes/room.route";
import messageRouter from "./routes/message.route";

dotenv.config();
connect();

const PORT = process.env.PORT || 8080;

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/room", roomRouter);
app.use("/api/message", messageRouter);

io.on("connection", (socket) => {
  socket.on("setup", (roomId) => {
    socket.join(roomId);
  });

  socket.on("message", (msg) => {
    io.to(msg.roomId).emit("message", msg);
  });
});

httpServer.listen(PORT);
