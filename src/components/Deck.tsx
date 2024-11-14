import { Dispatch, SetStateAction } from "react";
import Cards from "../../interface/cards";
import Player from "../../interface/player";
import { LinkedList } from "../../structs/linkedArray";
import { drawCard, getPitsCardsToDeck } from "../../cardsFunction";
import { Stack } from "../../structs/stack";
import Image from "next/image";

interface DeckProps {
    deck: LinkedList<Cards> | null,
    playerTurn: number,
    players: Player[],
    pit: Stack<Cards> | null,
    setPit: Dispatch<SetStateAction<Stack<Cards> | null>>,
    setDeck: Dispatch<SetStateAction<LinkedList<Cards> | null>>,
    nmbCardsToDraw: number,
    uuid: string
}

const Deck = ({
    deck,
    playerTurn,
    players,
    pit,
    setPit,
    setDeck,
    nmbCardsToDraw,
    uuid
}: DeckProps) => {

    return (
        <div>
            <button
                className="flex flex-col"
                onClick={() => {
                    drawCard(deck, pit, players, playerTurn, nmbCardsToDraw, uuid);

                    if (deck?.getSize() === 1) {
                        getPitsCardsToDeck(pit, setPit, setDeck);
                    }
                }}
            >
                <Image
                    src="/Cards/back.png"
                    alt="pit"
                    className="w-24 hover:border-4 border-white transition-all rounded-xl"
                />
            </button>
            Deck size: {deck?.getSize()}
        </div>
    )
}

export default Deck;
