import { socket } from "@/pages/_app";

export const emitCreateGame = (username: string) => {
    socket.emit("create", { username });
};

export const emitStartGame = (uuid: string) => {
    socket.emit("start", { uuid });
};

export const emitJoinGame = (uuid: string, username: string) => {
    socket.emit("join", { uuid, username });
};

export const onCreateGame = (callback: (...args: any[]) => void) => {
    socket.on("create", callback);
};

export const onStartGame = (callback: (...args: any[]) => void) => {
    socket.on("start", callback);
};

export const onJoinGame = (callback: (...args: any[]) => void) => {
    socket.on("join", callback);
};