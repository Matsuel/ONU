import { LinkedList } from "./linkedArray";
import { Stack } from "./stack";
import { Cards, Game } from "./type";
import { isCardPlayable, isPlayerTurn } from "./utils/cards";
import { initServer } from "./utils/initServer";
import loadEvents from "./utils/loadEvents";

const { io } = initServer();

// Utiliser une db pour stocker les parties
// Mettre toutes les evenements pour le jeu ici

let games = [] as Game[];

io.on("connection", async (socket) => {
  loadEvents(socket, games);

  socket.on("playCard", (data) => {
    const {
      deck,
      uuid,
      cardIndex,
      card,
      player,
      pit,
      players,
      playerTurn,
      setPlayerTurn,
      setPlayers,
      isTurnDirectionClockwise,
      setNmbCardsToDraw,
      nmbCardsToDraw,
    } = data;
    console.log(deck, "deck");
    const pitGame = new Stack(pit.stack);
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

    // if (card.special !== undefined) {
    //   playCard(player, cardIndex, pit, setPit, players, setPlayers);
    //   useSpecialCardEffect(
    //     card,
    //     playerTurn,
    //     setPlayerTurn,
    //     players,
    //     setIsTurnDirectionClockwise,
    //     isTurnDirectionClockwise,
    //     colorChangeRef,
    //     nmbCardsToDraw,
    //     setNmbCardsToDraw
    //   );
    // } else {
    //   playCard(player, cardIndex, pit, setPit, players, setPlayers);
    //   setPlayerTurn(
    //     getNextPlayerIndex(players, playerTurn, 1, isTurnDirectionClockwise)
    //   );
    // }
  });
});
