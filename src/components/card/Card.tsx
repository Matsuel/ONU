import React, { useContext, useState } from "react"
import Cards from "../../interface/cards"
import { socket } from "@/pages/_app"
import { isCardPlayable } from "../../cardsFunction"
import CardDisplay from "./CardDisplay"
import { PitContext } from "@/providers/PitProvider"
import { DeckContext } from "@/providers/DeckProvider"
import { GameContext } from "@/providers/GameProvider"
import { PlayersContext } from "@/providers/PlayersProvider"
import Player from "@/interface/player"
import CardBack from "./CardBack"
import ColorModal from "./ColorModal"

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
    const { deck } = useContext(DeckContext)
    const { isTurnDirectionClockwise, nmbCardsToDraw, uuid: playerUuid } = useContext(GameContext)
    const { playerTurn, players } = useContext(PlayersContext)

    const [isHovered, setIsHovered] = useState(false)

    const handleHover = (value: boolean) => {
        if (!card.color && players[playerTurn].uuid === player.uuid && players[playerTurn].uuid === playerUuid) { setIsHovered(value); }
    }

    const playCardOnClick = (
        cardIndex: number,
        card: Cards,
        player: Player,
        players: Player[],
        playerTurn: number,
        isTurnDirectionClockwise: boolean,
        nmbCardsToDraw: number,
        specialColor?: string
    ) => {
        console.log("playCardOnClick", deck);

        socket.emit("playCard", {
            deck,
            uuid,
            cardIndex,
            card,
            player,
            pit,
            players,
            playerTurn,
            isTurnDirectionClockwise,
            nmbCardsToDraw,
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
                }`} onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            onClick={() =>
                playCardOnClick(
                    cardIndex,
                    card,
                    player,
                    players,
                    playerTurn,
                    isTurnDirectionClockwise,
                    nmbCardsToDraw,
                )
            }
        >
            {isHovered && <ColorModal setIsHovered={setIsHovered} uuid={uuid} cardIndex={cardIndex} card={card} player={player} />}
            {player.uuid === playerUuid ? <CardDisplay card={card} /> : <CardBack />}
        </button >
    )
}

export default Card
