import { Socket } from "socket.io";
import { Game } from "../type";

const join = async (
  data: any,
  socket: Socket,
  games: Game[]
): Promise<void> => {
  const { uuid, username } = data;
  console.log("join", uuid);
  console.log("join", username);
  const game = games.find((g) => g.uuid === uuid);
  if (game) {
    // Check if player already exists
    const player = game.players.find((p) => p.name === username);
    if (player) {
      socket.emit("join", { status: false, message: "Player already exists" });
    } else if (game.players.length >= 4) {
      socket.emit("join", { status: false, message: "Game is full" });
    } else {
      game.players.push({
        uuid: socket.id,
        name: username,
        cards: [],
        socket: socket,
      });
      socket.emit("join", {
        status: true,
        uuid: uuid,
        playerUuid: game.players[game.players.length - 1].uuid,
      });
    }
  } else {
    socket.emit("join", { status: false, message: "Cette partie n'existe pas" });
  }
};

export default join;