import React, { useContext, useEffect, useState } from "react"
import { isCardPlayable, playCardOnClick } from "../../cardsFunction"
import CardDisplay from "./CardDisplay"
import CardBack from "./CardBack"
import ColorModal from "./ColorModal"
import { Cards, Player } from "@/types"
import PitContext from "@/contexts/PitContext"
import GameContext from "@/contexts/GameContext"
import PlayersContext from "@/contexts/PlayersContext"

interface CardProps {
    card: Cards
    cardIndex: number
    player: Player
    uuid: string
    playerIndex: number
}

const Card = ({
    card,
    cardIndex,
    player,
    uuid,
    playerIndex
}: CardProps) => {


    const { pit } = useContext(PitContext)
    const { uuid: playerUuid } = useContext(GameContext)
    const { playerTurn } = useContext(PlayersContext)

    const [isSpecialClicked, setIsSpecialClicked] = useState(false)

    useEffect(() => {
        setIsSpecialClicked(false)
    }, [playerTurn, pit])

    const isCurrentPlayerTurn = playerIndex === playerTurn;
    const isPlayable = isCardPlayable(card, pit!.peek());
    const isMyTurn = player.uuid === playerUuid && playerIndex === playerTurn;

    return (
        <button
            key={cardIndex}
            className={`transition-all rounded-xl ${isMyTurn
                ? isPlayable
                    ? "cursor-pointer hover:border-4 border-white"
                    : "opacity-30 cursor-not-allowed"
                : isCurrentPlayerTurn
                    ? "opacity-100 cursor-not-allowed"
                    : "opacity-30 cursor-not-allowed"
                }`}
            onClick={() => {
                if (card.special === "changecolor" || card.special === "plus4") {
                    setIsSpecialClicked(true)
                    return
                }
                setIsSpecialClicked(false)
                playCardOnClick(
                    cardIndex,
                    card,
                    player,
                    uuid,
                )
            }}
        >
            {isSpecialClicked ? <ColorModal setIsSpecialClicked={setIsSpecialClicked} uuid={uuid} cardIndex={cardIndex} card={card} player={player} /> : null}
            {player.uuid === playerUuid ? <CardDisplay card={card} /> : <CardBack />}
        </button >
    )
}

export default Card
