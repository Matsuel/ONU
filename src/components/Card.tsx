import React, { useState } from 'react'
import Player from '../../interface/player'
import { Stack } from '../../structs/stack'
import Cards from '../../interface/cards'
import { socket } from '@/pages/_app'
import { LinkedList } from '../../structs/linkedArray'
import { isCardPlayable } from '../../cardsFunction'
import CardDisplay from './CardDisplay'

interface CardProps {
    card: Cards
    cardIndex: number
    player: Player
    players: Player[]
    playerTurn: number
    isTurnDirectionClockwise: boolean
    nmbCardsToDraw: number
    pit: Stack<Cards> | null
    deck: LinkedList<Cards> | null
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
    pit,
    deck,
    uuid
}: CardProps) => {

    const [isHovered, setIsHovered] = useState(false)
    const colors = ["red", "green", "blue", "yellow"]
    const colorsCards = { "red": "r", "green": "g", "blue": "b", "yellow": "y" }

    /**
 * @param cardIndex - the index of the card played
 * @param card - the card played by the player
 * @param player - the last playing player
 * @param players - array of all the players
 * @param playerTurn - index of the current playing player
 * @param isTurnDirectionClockwise - checks if next player will be left or right
 * @param nmbCardsToDraw - nmb of cards that the player will draw
 **/
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
            onMouseEnter={() => { !card.color && players[playerTurn].uuid === player.uuid && setIsHovered(true) }}
            onMouseLeave={() => { !card.color && players[playerTurn].uuid === player.uuid && setIsHovered(false) }}
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
                        className="w-32 h-32 hover:border-4 border-white transition-all rounded-2xl"
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