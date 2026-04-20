import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { env } from "../config/env";

export function createSocketServer(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: { origin: env.SOCKET_ORIGIN, credentials: true }
  });

  io.on("connection", (socket) => {
    socket.on("chat:message", (payload) => {
      io.emit("chat:message", { ...payload, createdAt: new Date().toISOString() });
    });

    socket.on("schedule:update", (payload) => {
      io.emit("schedule:update", payload);
    });
  });

  return io;
}
