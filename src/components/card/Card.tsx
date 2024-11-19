import React, { useContext, useState } from "react"
import { socket } from "@/pages/_app"
import { isCardPlayable } from "../../cardsFunction"
import CardDisplay from "./CardDisplay"
import { PitContext } from "@/providers/PitProvider"
import { GameContext } from "@/providers/GameProvider"
import { PlayersContext } from "@/providers/PlayersProvider"
import CardBack from "./CardBack"
import ColorModal from "./ColorModal"
import { Cards, Player } from "@/types"

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
    const { playerTurn, players } = useContext(PlayersContext)

    const [isHovered, setIsHovered] = useState(false)

    const handleHover = (value: boolean) => {
        if (!card.color && players[playerTurn].uuid === player.uuid && players[playerTurn].uuid === playerUuid) { setIsHovered(value); }
    }

    const className = "w-32"

    const playCardOnClick = (
        cardIndex: number,
        card: Cards,
        player: Player,
        specialColor?: string
    ) => {

        socket.emit("playCard", {
            uuid,
            cardIndex,
            card,
            player,
            specialColor
        });
    };

    const isCurrentPlayerTurn = playerIndex === playerTurn;
    const isPlayable = isCardPlayable(card, pit!.peek());
    const isMyTurn = player.uuid === playerUuid && playerIndex === playerTurn;

    return (
        <button
            key={cardIndex}
            className={`relative transition-all rounded-xl ${isMyTurn
                ? isPlayable
                    ? "cursor-pointer hover:border-4 border-white"
                    : "opacity-30 cursor-not-allowed"
                : isCurrentPlayerTurn
                    ? "opacity-100 cursor-not-allowed"
                    : "opacity-30 cursor-not-allowed"
                }`}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            onClick={() =>
                playCardOnClick(
                    cardIndex,
                    card,
                    player,
                )
            }
        >
            {isHovered && <ColorModal setIsHovered={setIsHovered} uuid={uuid} cardIndex={cardIndex} card={card} player={player} />}
            {player.uuid === playerUuid ? <CardDisplay card={card} /> : <CardBack />}
        </button >
    )
}

export default Card
