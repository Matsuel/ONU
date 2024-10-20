import { Dispatch, SetStateAction } from "react";
import Cards from "../../../../interface/cards";
import Player from "../../../../interface/player";
import { LinkedList } from "../../../../structs/linkedArray";
import { drawCard } from "../../../../cardsFunction";

interface DeckProps {
    deck: LinkedList<Cards> | null,
    playerTurn: number,
    players: Player[],
    setPlayers: Dispatch<SetStateAction<Player[]>>,
    setPlayerTurn: Dispatch<SetStateAction<number>>,
}

const Deck = ({ deck, playerTurn, players, setPlayers, setPlayerTurn } : DeckProps) => {
    return (
        <div>
            <button
                className="flex flex-col"
                onClick={() => drawCard(players[playerTurn], deck!, players, setPlayers, playerTurn, setPlayerTurn)}
            >
                <img
                    src="/Cards/back.png"
                    alt="pit"
                    className="w-24"
                />
            </button>
            Deck size: {deck?.getSize() || 0}
        </div>
    )
}

export default Deck;
