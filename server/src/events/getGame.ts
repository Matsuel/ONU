import { Socket } from "socket.io";
import { Game } from "../type";

const getGame = async (
  data: any,
  socket: Socket,
  games: Game[]
): Promise<void> => {
  const { id } = data;
  const game = games.find(
    (g) => g.uuid === id && g.players.find((p) => p.socket.id === socket.id)
  );
  if (game) {
    const simplifiedGame = {
      ...game,
      players: game.players.map(({ uuid, name, cards }) => ({
        uuid,
        name,
        cards,
      })),
    };
    socket.emit("getGame", { game: simplifiedGame });
  }
};

export default getGame;
