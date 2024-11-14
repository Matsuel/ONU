import { useContext } from "react";
import { drawCard, getPitsCardsToDeck } from "@/cardsFunction";
import Image from "next/image";
import { PitContext } from "@/providers/PitProvider";
import { DeckContext } from "@/providers/DeckProvider";
import { PlayersContext } from "@/providers/PlayersProvider";
import { GameContext } from "@/providers/GameProvider";

interface DeckProps {
    uuid: string
}

const Deck = ({
    uuid
}: DeckProps) => {

    const { pit, setPit } = useContext(PitContext);
    const { deck, setDeck } = useContext(DeckContext)
    const { playerTurn, players } = useContext(PlayersContext);
    const { nmbCardsToDraw } = useContext(GameContext);

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
