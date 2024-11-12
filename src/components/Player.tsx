import Player from "../../interface/player";
import CardDisplay from "./CardDisplay";
import {
  isCardPlayable,
} from "../../cardsFunction";
import Cards from "../../interface/cards";
import { Stack } from "../../structs/stack";
import { LinkedList } from "../../structs/linkedArray";
import { socket } from "@/pages/_app";
import Card from "./Card";

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

  return (
    <div>
      <p className="text-red-700 text-2xl">
        {players[playerTurn]?.name}'s turn
      </p>

      {players.map((player, index) => (
        <div key={index}>
          <p>{player.name}</p>
          {player.cards.map((card, cardIndex) => (
            <Card
              key={cardIndex}
              card={card}
              cardIndex={cardIndex}
              player={player}
              players={players}
              playerTurn={playerTurn}
              isTurnDirectionClockwise={isTurnDirectionClockwise}
              nmbCardsToDraw={nmbCardsToDraw}
              pit={pit}
              deck={deck}
              uuid={uuid}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Players;
