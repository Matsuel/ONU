import { LinkedList } from "./linkedArray";
import { Stack } from "./stack";
import { Cards, Game } from "./type";
import { addCardsToPlayer, getNextPlayerIndex, isCardPlayable, isPlayerTurn, playCard, useSpecialCardEffect } from "./utils/cards";
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
      nmbCardsToDraw,
      specialColor,
    } = data;
    console.log(specialColor, card, "deck");
    if (card.special !== undefined && (specialColor === undefined && card.color === undefined)) return
    if (specialColor) {
      card.color = specialColor;
      player.cards[cardIndex].color = specialColor;
    }
    console.log("playCard", player);
    // return
    const pitGame = new Stack(pit.stack) as Stack<Cards>;
    const deckGame = new LinkedList<Cards>();
    deckGame.fromJSON(deck);
    // console.log(pitGame.peek(), "pitGame");
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
      // console.log("special card", card);
      let {
        newPit: pit2,
        player: player2,
        updatedPlayers: players2,
      } = playCard(player, cardIndex, pitGame, players);
      const { isTurnDirectionClockwise: isTurnDirectionClockwise2, nmbCardsToDraw: nmbCardsToDraw2, playerTurn: playerTurn2, players: players3 }
        = useSpecialCardEffect(
          card,
          playerTurn,
          players2,
          isTurnDirectionClockwise,
          nmbCardsToDraw,
          deckGame
        );
      playerTurn = playerTurn2;
      // players = players3;
      isTurnDirectionClockwise = isTurnDirectionClockwise2;
      nmbCardsToDraw = nmbCardsToDraw2;
      const game = games.find((g) => g.uuid === uuid) as Game;
      game.players.forEach((p) => {
        p.socket.emit("getGame", { game: { players: players3, playerTurn: playerTurn2, deck: deckGame, pit: pit2 } });
      });
    } else {
      let {
        newPit: pit2,
        player: player2,
        updatedPlayers: players2,
      } = playCard(player, cardIndex, pitGame, players);
      playerTurn = getNextPlayerIndex(players, playerTurn, 1, isTurnDirectionClockwise)
      const game = games.find((g) => g.uuid === uuid) as Game;
      game.players.forEach((p) => {
        p.socket.emit("getGame", { game: { players: players2, playerTurn, deck: deckGame, pit: pit2 } });
      });
    }
  });

  socket.on("drawCard", (data) => {
    const { uuid, pit, deck, players, playerTurn } = data;
    console.log("drawCard before", players);
    const deckGame = new LinkedList<Cards>();
    deckGame.fromJSON(deck);
    const pitGame = new Stack(pit.stack) as Stack<Cards>;
    const updatedPlayers = addCardsToPlayer(players, playerTurn, 1, deckGame);
    console.log("drawCard", updatedPlayers);
    const playerTurn2 = getNextPlayerIndex(players, playerTurn, 1, true);
    const game = games.find((g) => g.uuid === uuid) as Game;
    game.players.forEach((p) => {
      p.socket.emit("getGame", { game: { players: updatedPlayers, playerTurn: playerTurn2, deck: deckGame, pit: pitGame } });
    });
  });
});
