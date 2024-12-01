import { useContext } from "react";
import { drawCard, getPitsCardsToDeck } from "@/utils/cardsFunction";
import Image from "next/image";
import DeckContext from "@/contexts/DeckContext";
import GameContext from "@/contexts/GameContext";
import PitContext from "@/contexts/PitContext";
import PlayersContext from "@/contexts/PlayersContext";

interface DeckProps {
    uuid: string
}

const Deck = ({
    uuid
}: DeckProps) => {
    const { pit, setPit } = useContext(PitContext);
    const { deck, setDeck } = useContext(DeckContext)
    const { playerTurn, players } = useContext(PlayersContext);
    const { uuid: playerUuid } = useContext(GameContext);

    return (
        <div>
            <button
                className="flex flex-col"
                onClick={() => {
                    if (playerUuid !== players[playerTurn].uuid) return;
                    drawCard(deck, pit, players, playerTurn, uuid);

                    if (deck?.getSize() === 1) {
                        getPitsCardsToDeck(pit, setPit, setDeck);
                    }
                }}
            >
                <Image
                    src="/Cards/back.png"
                    alt="pit"
                    className={`${playerUuid === players[playerTurn].uuid ? "cursor-pointer hover:border-4 border-white transition-all rounded-xl" : "opacity-30 cursor-not-allowed"}`}
                    width={100}
                    height={100}
                />
            </button>
        </div>
    )
}

export default Deck;
