import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";

export const initServer = (): {
    io: Server;
} => {
    const server = createServer();

    const io = new Server(server);

    const port = process.env.NEXT_PUBLIC_PORT 
    server.listen(port, () => {
        console.log(`Server running on https://localhost:${port}`);
    });

    return { io };
};
