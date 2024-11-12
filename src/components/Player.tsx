import Player from "../../interface/player";
import CardDisplay from "./CardDisplay";
import {
  isCardPlayable,
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
  deck: LinkedList<Cards> | null;
  isTurnDirectionClockwise: boolean;
  nmbCardsToDraw: number;
  uuid: string;
}

const Players = ({
  uuid,
  players,
  playerTurn,
  pit,
  deck,
  isTurnDirectionClockwise,
  nmbCardsToDraw,
}: PlayersProps) => {
  /**
   * @param cardIndex - the index of the card played
   * @param card - the card played by the player
   * @param player - the last playing player
   * @param players - array of all the players
   * @param playerTurn - index of the current playing player
   * @param isTurnDirectionClockwise - checks if next player will be left or right
   * @param nmbCardsToDraw - nmb of cards that the player will draw
   **/
  const playCardOnClick = (
    cardIndex: number,
    card: Cards,
    player: Player,
    players: Player[],
    playerTurn: number,
    isTurnDirectionClockwise: boolean,
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
      isTurnDirectionClockwise,
      nmbCardsToDraw,
    });
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
              className={`cursor-not-allowed ${isCardPlayable(card, pit!.peek()) &&
                players[playerTurn].uuid === player.uuid
                ? "cursor-pointer hover:border-4 border-white transition-all rounded-xl"
                : "opacity-30 cursor-not-allowed"
                }`}
              onClick={() =>
                playCardOnClick(
                  cardIndex,
                  card,
                  player,
                  players,
                  playerTurn,
                  isTurnDirectionClockwise,
                  nmbCardsToDraw,
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
