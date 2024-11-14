import { Socket } from "socket.io";
import { Game } from "../type";

const start = async (
  data: any,
  socket: Socket,
  games: Game[]
): Promise<void> => {
  const { uuid } = data;
  const game = games.find((g) => g.uuid === uuid);
  if (game) {
    if (game.players.length < 2) {
      socket.emit("start", {
        status: false,
        message: "Not enough players",
      });
      return;
    }
    game.playerTurn = Math.floor(Math.random() * game.players.length);
    // distribuer les cartes
    for (let i = 0; i < 7; i++) {
      game.players.forEach((player) => {
        player.cards.push(game.deck.removeHead());
      });
    }

    // informer les joueurs que la partie va commencer
    game.players.forEach((player) => {
      player.socket.emit("start", { status: true, uuid: uuid });
    });
  } else {
    socket.emit("start", { status: false, message: "Game not found" });
  }
};

export default start;
