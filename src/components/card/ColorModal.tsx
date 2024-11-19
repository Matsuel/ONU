import { colors, colorsCards } from '@/constantes/colors';
import { socket } from '@/pages/_app';
import { Cards, Player } from '@/types';
import React from 'react'

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

    return (
        <div className="absolute w-full h-full flex-row flex-wrap top-[50%] left-[50%] transform-gpu -translate-x-1/2 -translate-y-1/2">
            {colors.map((color, index) => (
                <button
                    className="w-5 h-5 hover:border-4 border-white transition-all rounded-2xl"
                    style={{ background: color }}
                    key={index}
                    onClick={() => {
                        setIsHovered(false)
                        socket.emit("playCard", {
                            uuid,
                            cardIndex,
                            card,
                            player,
                            specialColor: colorsCards[color as keyof typeof colorsCards]
                        });
                    }}
                ></button>
            ))}
        </div>
    )
}

export default ColorModal