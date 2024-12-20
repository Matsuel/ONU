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
    app.use((0, cors_1.default)({
        origin: "*",
        methods: ["GET", "POST"],
    }));
    const server = (0, http_1.createServer)(app);
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    const port = process.env.NEXT_PUBLIC_PORT;
    server.listen(port, () => {
        console.log(`Server running on https://localhost:${port}`);
    });
    return { io };
};
exports.initServer = initServer;
