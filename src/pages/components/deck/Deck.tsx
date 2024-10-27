import { Dispatch, SetStateAction } from "react";
import Cards from "../../../../interface/cards";
import Player from "../../../../interface/player";
import { LinkedList } from "../../../../structs/linkedArray";
import { drawCard, getPitsCardsToDeck } from "../../../../cardsFunction";
import Image from "next/image";

interface DeckProps {
    deck: LinkedList<Cards> | null,
    playerTurn: number,
    players: Player[],
    setPlayers: Dispatch<SetStateAction<Player[]>>,
    setPlayerTurn: Dispatch<SetStateAction<number>>,
    pit: LinkedList<Cards> | null,
    setPit: Dispatch<SetStateAction<LinkedList<Cards> | null>>,
    setDeck: Dispatch<SetStateAction<LinkedList<Cards> | null>>,
    isTurnDirectionClockwise: boolean,
    nmbCardsToDraw: number,
    setNmbCardsToDraw: Dispatch<SetStateAction<number>>
}

const Deck = ({ 
    deck, 
    playerTurn, 
    players, 
    setPlayers, 
    pit,
    setPit,
    setDeck,
    setPlayerTurn,
    isTurnDirectionClockwise,
    nmbCardsToDraw,
    setNmbCardsToDraw } : DeckProps) => {

    return (
        <div>
            <button
                className="flex flex-col"
                onClick={() => {
                        drawCard(deck, setPit, pit, setPlayers, players, playerTurn, setPlayerTurn, isTurnDirectionClockwise, nmbCardsToDraw, setNmbCardsToDraw);

                        if (deck?.getSize() === 1) {
                            getPitsCardsToDeck(pit, setPit, setDeck);
                        }
                }}
            >
                <Image
                    src="/Cards/back.png"
                    alt="pit"
                    className="hover:border-4 border-white transition-all rounded-xl"
                    width={100}
                    height={100}
                />
            </button>
            Deck size: {deck?.getSize() || 0}
        </div>
    )
}

export default Deck;
