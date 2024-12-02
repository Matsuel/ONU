"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initServer = void 0;
require("dotenv/config");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const initServer = () => {
    const server = (0, http_1.createServer)();
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "onu.alexandrebel.me",
            methods: ["GET", "POST", "OPTIONS"],
        },
    });
    const port = process.env.NEXT_PUBLIC_PORT;
    server.listen(port, () => {
        console.log(`Server running on https://localhost:${port}`);
    });
    return { io };
};
exports.initServer = initServer;
