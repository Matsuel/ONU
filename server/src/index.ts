import { LinkedList } from "./linkedArray";
import { Stack } from "./stack";
import { Cards, Game } from "./type";
import { isCardPlayable, isPlayerTurn, playCard } from "./utils/cards";
import { initServer } from "./utils/initServer";
import loadEvents from "./utils/loadEvents";

const { io } = initServer();

// Utiliser une db pour stocker les parties
// Mettre toutes les evenements pour le jeu ici

let games = [] as Game[];

io.on("connection", async (socket) => {
  loadEvents(socket, games);

  socket.on("playCard", (data) => {
    let {
      deck,
      uuid,
      cardIndex,
      card,
      player,
      pit,
      players,
      playerTurn,
      isTurnDirectionClockwise,
      setNmbCardsToDraw,
      nmbCardsToDraw,
    } = data;
    console.log(deck, "deck");
    const pitGame = new Stack(pit.stack) as Stack<Cards>;
    const deckGame = new LinkedList<Cards>();
    deckGame.fromJSON(deck);
    console.log(pitGame.peek(), "pitGame");
    if (!pitGame) {
      console.error("Pit cannot be null");
      return;
    }

    if (!deckGame) {
      console.error("Deck cannot be null");
      return;
    }

    if (!isPlayerTurn(player, players, playerTurn)) {
      console.error(`${player.name}: can't play, not your turn`);
      return false;
    }

    if (!isCardPlayable(card, pitGame.peek() as Cards)) {
      console.error(
        `${JSON.stringify(card)} not playable on ${JSON.stringify(pitGame.peek())}`
      );
      return false;
    }

    if (card.special !== undefined) {
      console.log("special card");
      playCard(player, cardIndex, pitGame, players);
      // useSpecialCardEffect(
      //   card,
      //   playerTurn,
      //   setPlayerTurn,
      //   players,
      //   setIsTurnDirectionClockwise,
      //   isTurnDirectionClockwise,
      //   colorChangeRef,
      //   nmbCardsToDraw,
      //   setNmbCardsToDraw
      // );
    } else {
      console.log("normal card");
      console.log(player, cardIndex, pitGame, players);
      let {
        newPit: pit2,
        player: player2,
        updatedPlayers: players2,
      } = playCard(player, cardIndex, pitGame, players);
      console.log(pit2);
      socket.emit("playCard", { pit: pit2, players: players2 });
      // setPlayerTurn(
      //   getNextPlayerIndex(players, playerTurn, 1, isTurnDirectionClockwise)
      // );
    }
  });
});
