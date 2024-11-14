import { Dispatch, SetStateAction, useContext } from "react";
import Cards from "../../interface/cards";
import Player from "../../interface/player";
import { LinkedList } from "../../structs/linkedArray";
import { drawCard, getPitsCardsToDeck } from "../../cardsFunction";
import { Stack } from "../../structs/stack";
import Image from "next/image";
import { PitContext } from "@/providers/PitProvider";

interface DeckProps {
    deck: LinkedList<Cards> | null,
    playerTurn: number,
    players: Player[],
    setDeck: Dispatch<SetStateAction<LinkedList<Cards> | null>>,
    nmbCardsToDraw: number,
    uuid: string
}

const Deck = ({
    deck,
    playerTurn,
    players,
    setDeck,
    nmbCardsToDraw,
    uuid
}: DeckProps) => {

    const { pit, setPit } = useContext(PitContext);

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
                    width={100}
                    height={100}
                />
            </button>
            Deck size: {deck?.getSize()}
        </div>
    )
}

export default Deck;
