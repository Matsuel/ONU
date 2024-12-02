import { socket } from "@/pages/_app";
import { GameCreationStatus } from "@/types";


export const emitCreateGame = (username: string) => {
    socket.emit("create", { username });
};

export const emitStartGame = (uuid: string) => {
    socket.emit("start", { uuid });
};

export const emitJoinGame = (uuid: string, username: string) => {
    socket.emit("join", { uuid, username });
};

export const onCreateGame = (callback: (...args: GameCreationStatus[]) => void) => {
    socket.on("create", callback);
};

export const onStartGame = (callback: (...args: GameCreationStatus[]) => void) => {
    socket.on("start", callback);
};

export const onJoinGame = (callback: (...args: GameCreationStatus[]) => void) => {
    socket.on("join", callback);
};
