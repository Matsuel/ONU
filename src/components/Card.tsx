import React, { useContext, useState } from "react"
import Player from "../../interface/player"
import Cards from "../../interface/cards"
import { socket } from "@/pages/_app"
import { isCardPlayable } from "../../cardsFunction"
import CardDisplay from "./CardDisplay"
import { PitContext } from "@/providers/PitProvider"
import { DeckContext } from "@/providers/DeckProvider"

interface CardProps {
    card: Cards
    cardIndex: number
    player: Player
    players: Player[]
    playerTurn: number
    isTurnDirectionClockwise: boolean
    nmbCardsToDraw: number
    uuid: string
}

const Card = ({
    card,
    cardIndex,
    player,
    players,
    playerTurn,
    isTurnDirectionClockwise,
    nmbCardsToDraw,
    uuid
}: CardProps) => {

    const { pit } = useContext(PitContext)
    const {deck} = useContext(DeckContext)

    const [isHovered, setIsHovered] = useState(false)
    const colors = ["red", "green", "blue", "yellow"]
    const colorsCards = { "red": "r", "green": "g", "blue": "b", "yellow": "y" }

    const handleHover = (value: boolean) => {
        if (!card.color && players[playerTurn].uuid === player.uuid) { setIsHovered(value); }
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

    return (
        <button
            key={cardIndex}
            className={`relative ${isCardPlayable(card, pit!.peek()) &&
                players[playerTurn].uuid === player.uuid
                ? "cursor-pointer hover:border-4 border-white transition-all rounded-xl"
                : "opacity-30 cursor-not-allowed"
                }`}
            onMouseEnter={() => handleHover(true)}
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
            {isHovered && <div className="absolute top-[50%] left-[50%] transform-gpu -translate-x-1/2 -translate-y-1/2">
                {colors.map((color, index) => (
                    <button
                        className="w-20 h-20 hover:border-4 border-white transition-all rounded-2xl"
                        style={{ background: color }}
                        key={index}
                        onClick={() => {
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
                                specialColor: colorsCards[color as keyof typeof colorsCards]
                            });
                            // playCardOnClick(

                            // );
                            setIsHovered(false)

                        }}
                    ></button>
                ))}
            </div>}
            <CardDisplay key={cardIndex} card={card} />
        </button >
    )
}

export default Card