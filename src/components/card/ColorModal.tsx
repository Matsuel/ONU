import { colors, colorsCards } from '@/constantes/colors';
import Cards from '@/interface/cards';
import Player from '@/interface/player';
import { socket } from '@/pages/_app';
import { DeckContext } from '@/providers/DeckProvider';
import { GameContext } from '@/providers/GameProvider';
import { PitContext } from '@/providers/PitProvider';
import { PlayersContext } from '@/providers/PlayersProvider';
import React, { useContext } from 'react'

interface ColorModalProps {
    setIsHovered: React.Dispatch<React.SetStateAction<boolean>>
    uuid: string
    cardIndex: number
    card: Cards
    player: Player
}

const ColorModal = ({
    setIsHovered,
    uuid,
    cardIndex,
    card,
    player
}: ColorModalProps) => {

    const { pit } = useContext(PitContext)
    const { deck } = useContext(DeckContext)
    const { playerTurn, players } = useContext(PlayersContext)
    const { isTurnDirectionClockwise, nmbCardsToDraw } = useContext(GameContext)

    return (
        <div className="absolute w-full h-full flex-row flex-wrap top-[50%] left-[50%] transform-gpu -translate-x-1/2 -translate-y-1/2">
            {colors.map((color, index) => (
                <button
                    className="w-12 h-12 hover:border-4 border-white transition-all rounded-2xl"
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
                        setIsHovered(false)
                    }}
                ></button>
            ))}
        </div>
    )
}

export default ColorModal