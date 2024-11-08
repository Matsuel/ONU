import { Socket } from "socket.io";
import { Game } from "../type";

const getGame = async (
  data: any,
  socket: Socket,
  games: Game[]
): Promise<void> => {
  console.log(data);
  const { id, uuid } = data;
  const game = games.find(
    (g) => g.uuid === id && g.players.find((p) => p.uuid === uuid)
  );
  if (game) {
    // modfier le player avec le socket
    console.log(game);
    game.players = game.players.map((p) =>
      p.uuid === uuid ? { ...p, socket } : p
    );
    console.log(game);
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