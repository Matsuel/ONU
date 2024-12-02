import "dotenv/config";
import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";

export const initServer = (): {
    io: Server;
} => {
    const app = express();

    app.use(cors({
        origin: "*",  
        methods: ["GET", "POST", "OPTIONS"],  
        allowedHeaders: ["DNT", "User-Agent", "X-Requested-With", "If-Modified-Since", "Cache-Control", "Content-Type", "Range"],  
    }));

    const server = createServer(app);

    const io = new Server(server, {
        cors: {
            origin: "*",  
            methods: ["GET", "POST", "OPTIONS"],  
        },
    });

    const port = process.env.NEXT_PUBLIC_PORT;
    server.listen(port, () => {
        console.log(`Server running on https://localhost:${port}`);
    });

    return { io };
};

