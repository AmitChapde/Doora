import { Server } from "socket.io";
import http from "http";
import { socketAuth } from "./auth.middleware";
import WorkspaceMember from "../models/workspacemember.model";
import { getBoardById } from "../services/board.service";

let io: Server;

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  // APPLY SOCKET AUTH MIDDLEWARE HERE
  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
    console.log("Authenticated user:", socket.data.user);

    //  SECURE BOARD JOIN
    socket.on("join:board", async (boardId: string) => {
      try {
        const user = socket.data.user;

        if (!user) {
          socket.emit("error", "Unauthorized");
          return;
        }

        const board = await getBoardById(boardId);
        if (!board) {
          socket.emit("error", "Board not found");
          return;
        }

        const member = await WorkspaceMember.findOne({
          userId: user.id,
          workspaceId: board.workspaceId,
        });

        if (!member) {
          socket.emit("error", "Access denied");
          return;
        }

        socket.join(`board:${boardId}`);
        console.log(
          `Socket ${socket.id} joined board:${boardId} as ${member.role}`
        );
      } catch (err) {
        socket.emit("error", "Failed to join board");
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
