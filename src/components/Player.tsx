import Player from "../../interface/player";
import CardDisplay from "./CardDisplay";
import {
  isCardPlayable,
  playCard,
  useSpecialCardEffect,
  isPlayerTurn,
  getNextPlayerIndex,
} from "../../cardsFunction";
import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";
import Cards from "../../interface/cards";
import { Stack } from "../../structs/stack";
import { LinkedList } from "../../structs/linkedArray";
import { socket } from "@/pages/_app";

interface PlayersProps {
  players: Player[];
  playerTurn: number;
  pit: Stack<Cards> | null;
  setPit: Dispatch<SetStateAction<Stack<Cards> | null>>;
  setPlayerTurn: Dispatch<SetStateAction<number>>;
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  deck: LinkedList<Cards> | null;
  isTurnDirectionClockwise: boolean;
  setIsTurnDirectionClockwise: Dispatch<SetStateAction<boolean>>;
  colorChangeRef: MutableRefObject<null>;
  nmbCardsToDraw: number;
  setNmbCardsToDraw: Dispatch<SetStateAction<number>>;
  uuid: string;
}

const Players = ({
  uuid,
  players,
  playerTurn,
  pit,
  setPit,
  setPlayerTurn,
  setPlayers,
  deck,
  isTurnDirectionClockwise,
  setIsTurnDirectionClockwise,
  colorChangeRef,
  nmbCardsToDraw,
  setNmbCardsToDraw,
}: PlayersProps) => {
  /**
   * @param cardIndex - the index of the card played
   * @param card - the card played by the player
   * @param player - the last playing player
   * @param setPit - set the pit (Stack<Cards>)
   * @param players - array of all the players
   * @param playerTurn - index of the current playing player
   * @param setPlayerTurn - set the index of the current playing player
   * @param setPlayers - set the array of players
   * @param isTurnDirectionClockwise - checks if next player will be left or right
   * @param setNmbCardsToDraw - set nmb of cards that the player will draw
   * @param nmbCardsToDraw - nmb of cards that the player will draw
   **/
  const playCardOnClick = (
    cardIndex: number,
    card: Cards,
    player: Player,
    setPit: Dispatch<SetStateAction<Stack<Cards> | null>>,
    players: Player[],
    playerTurn: number,
    setPlayerTurn: Dispatch<SetStateAction<number>>,
    setPlayers: Dispatch<SetStateAction<Player[]>>,
    isTurnDirectionClockwise: boolean,
    setNmbCardsToDraw: Dispatch<SetStateAction<number>>,
    nmbCardsToDraw: number
  ) => {
    console.log("playCardOnClick", deck);

    socket.emit("playCard", {
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
    });

    if (!pit) {
      console.error("Pit cannot be null");
      return;
    }

    if (!deck) {
      console.error("Deck cannot be null");
      return;
    }

    if (!isPlayerTurn(player, players, playerTurn)) {
      console.error(`${player.name}: can't play, not your turn`);
      return false;
    }

    if (!isCardPlayable(card, pit.peek())) {
      console.error(
        `${JSON.stringify(card)} not playable on ${JSON.stringify(pit.peek())}`
      );
      return false;
    }

    if (card.special !== undefined) {
      playCard(player, cardIndex, pit, setPit, players, setPlayers);
      useSpecialCardEffect(
        card,
        playerTurn,
        setPlayerTurn,
        players,
        setIsTurnDirectionClockwise,
        isTurnDirectionClockwise,
        colorChangeRef,
        nmbCardsToDraw,
        setNmbCardsToDraw
      );
    } else {
      playCard(player, cardIndex, pit, setPit, players, setPlayers);
      setPlayerTurn(
        getNextPlayerIndex(players, playerTurn, 1, isTurnDirectionClockwise)
      );
    }
  };

  return (
    <div>
      <p className="text-red-700 text-2xl">
        {players[playerTurn]?.name}'s turn
      </p>

      {players.map((player, index) => (
        <div key={index}>
          <p>{player.name}</p>
          {player.cards.map((card, cardIndex) => (
            <button
              key={cardIndex}
              className={`cursor-not-allowed ${
                isCardPlayable(card, pit!.peek()) &&
                players[playerTurn].uuid === player.uuid
                  ? "cursor-pointer hover:border-4 border-white transition-all rounded-xl"
                  : "opacity-30 cursor-not-allowed"
              }`}
              onClick={() =>
                playCardOnClick(
                  cardIndex,
                  card,
                  player,
                  setPit,
                  players,
                  playerTurn,
                  setPlayerTurn,
                  setPlayers,
                  isTurnDirectionClockwise,
                  setNmbCardsToDraw,
                  nmbCardsToDraw
                )
              }
            >
              <CardDisplay key={cardIndex} card={card} />
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Players;
