"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initServer = void 0;
require("dotenv/config");
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const initServer = () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    const server = (0, http_1.createServer)(app);
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
        },
    });
    const port = process.env.NEXT_PUBLIC_PORT;
    console.log(port);
    server.listen(port, () => {
        console.log(`Server running on port ${port} TEST TEST TEST`);
    });
    return { io };
};
exports.initServer = initServer;
