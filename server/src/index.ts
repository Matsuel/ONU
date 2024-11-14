import { LinkedList } from "./linkedArray";
import { Stack } from "./stack";
import { Cards, Game, Player } from "./type";
import { addCardsToPlayer, getNextPlayerIndex, isCardPlayable, isPlayerTurn, playCard, useSpecialCardEffect } from "./utils/cards";
import { initServer } from "./utils/initServer";
import loadEvents from "./utils/loadEvents";

const { io } = initServer();

// Utiliser une db pour stocker les parties
// Mettre toutes les evenements pour le jeu ici

const games = [] as Game[];

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
    if (card.special !== undefined && (specialColor === undefined && card.color === undefined)) return
    if (specialColor) {
      card.color = specialColor;
      player.cards[cardIndex].color = specialColor;
    }
    const pitGame = new Stack(pit.stack) as Stack<Cards>;
    const deckGame = new LinkedList<Cards>();
    deckGame.fromJSON(deck);
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
      isTurnDirectionClockwise = isTurnDirectionClockwise2;
      nmbCardsToDraw = nmbCardsToDraw2;
      const game = games.find((g) => g.uuid === uuid) as Game;
      if (checkIfPlayerHasWon(players3)) {
        game.players.forEach((p) => {
          p.socket.emit("gameOver", { winner: checkIfPlayerHasWon(players3) });
        });
      }
      game.players.forEach((p) => {
        p.socket.emit("getGame", { game: { players: players3, playerTurn: playerTurn2, deck: deckGame, pit: pit2 } });
      });
      games.forEach((g) => {
        if (g.uuid === uuid) {

          g.players = players2.map((p) => {
            const existingPlayer = g.players.find((gp) => gp.uuid === p.uuid);
            return {
              ...p,
              socket: existingPlayer ? existingPlayer.socket : p.socket,
            };
          });
          g.playerTurn = playerTurn;
          g.deck = deckGame;
          g.pit = pit2;
        }
      });
    } else {
      let {
        newPit: pit2,
        player: player2,
        updatedPlayers: players2,
      } = playCard(player, cardIndex, pitGame, players);
      playerTurn = getNextPlayerIndex(players, playerTurn, 1, isTurnDirectionClockwise)
      const game = games.find((g) => g.uuid === uuid) as Game;
      if (checkIfPlayerHasWon(players2)) {
        game.players.forEach((p) => {
          p.socket.emit("gameOver", { winner: checkIfPlayerHasWon(players2) });
        });
      }
      game.players.forEach((p) => {
        p.socket.emit("getGame", { game: { players: players2, playerTurn, deck: deckGame, pit: pit2 } });
      });
      games.forEach((g) => {
        if (g.uuid === uuid) {

          g.players = players2.map((p) => {
            const existingPlayer = g.players.find((gp) => gp.uuid === p.uuid);
            return {
              ...p,
              socket: existingPlayer ? existingPlayer.socket : p.socket,
            };
          });
          g.playerTurn = playerTurn;
          g.deck = deckGame;
          g.pit = pit2;
        }
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
    games.forEach((g) => {
      if (g.uuid === uuid) {

        g.players = updatedPlayers.map((p) => {
          const existingPlayer = g.players.find((gp) => gp.uuid === p.uuid);
          return {
            ...p,
            socket: existingPlayer ? existingPlayer.socket : p.socket,
          };
        });
        g.playerTurn = playerTurn;
        g.deck = deckGame;
        g.pit = pitGame;
      }
    });
  });
});

const checkIfPlayerHasWon = (players: Player[]) => {
  for (const player of players) {
    console.log(player.cards, player.name);
    if (player.cards.length === 0) {
      return player;
    }
  }
  return null;
};
