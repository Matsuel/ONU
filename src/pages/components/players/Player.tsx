import Player from "../../../../interface/player";
import CardDisplay from "../card-display/CardDisplay";
import { isCardPlayable, playCard } from "../../../../cardsFunction";
import { Dispatch, SetStateAction } from "react";
import Cards from "../../../../interface/cards";
import { Stack } from "../../../../structs/stack";

interface PlayersProps {
    players: Player[],
    playerTurn: number, 
    pit: Stack<Cards> | null,
    setPit: Dispatch<SetStateAction<Stack<Cards> | null>>,
    setPlayerTurn: Dispatch<SetStateAction<number>>,
    setPlayers: Dispatch<SetStateAction<Player[]>>,
}

const Players = ({ players, playerTurn, pit, setPit, setPlayerTurn, setPlayers } : PlayersProps) => {
    return (
        <div>
            <p className="text-red-700 text-2xl">
                {players[playerTurn]?.name}'s turn
            </p>
            {players.map((player, index) => (
                <div
                    key={index}
                    className={`${players[playerTurn].uuid === player.uuid ? '' : 'opacity-30 cursor-default'}`}
                >
                    <p>{player.name}</p>
                    {player.cards.map((card, cardIndex) => (
                        <button
                            key={cardIndex}
                            className={`${isCardPlayable(card, pit!.peek()) ? '' : 'opacity-30'}`}
                            onClick={() => {
                                playCard(player, cardIndex, pit, setPit, players, playerTurn, setPlayerTurn, setPlayers);
                            }}
                        >
                            <CardDisplay
                                key={cardIndex}
                                card={card}
                            />
                        </button>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Players;
