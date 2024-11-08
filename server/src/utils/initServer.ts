import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";

export const initServer = (): {
  io: Server;
} => {
  const app = express();
  app.use(cors());
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  server.listen(8000, () => {
    console.log("Server running on port 8000");
  });

  return { io };
};
