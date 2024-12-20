import { playCardOnClick } from '@/utils/cardsFunction';
import { colors, colorsCards } from '@/constantes/colors';
import GameContext from '@/contexts/GameContext';
import { Cards, Player } from '@/types';
import React, { useContext } from 'react'

interface ColorModalProps {
    setIsSpecialClicked: React.Dispatch<React.SetStateAction<boolean>>
    uuid: string
    cardIndex: number
    card: Cards
    player: Player
}

const ColorModal = ({
    setIsSpecialClicked,
    uuid,
    cardIndex,
    card,
    player
}: ColorModalProps) => {

    const { uuid: playerUuid } = useContext(GameContext);
    const isCurrentPlayerTurn = player.uuid === playerUuid;
    const placement = isCurrentPlayerTurn ? "top-[-60px]" : "bottom-[-60px]";

    return (
        <div className={`absolute z-50 w-full h-full flex-row left-[50%] transform-gpu -translate-x-1/2 ${placement}`}>
            {colors.map((color, index) => (
                <button
                    className="w-10 h-10 hover:border-4 border-white transition-all rounded-2xl"
                    style={{ background: color }}
                    key={index}
                    onClick={() => {
                        setIsSpecialClicked(false)
                        playCardOnClick(cardIndex, card, player, uuid, colorsCards[color as keyof typeof colorsCards]);
                    }}
                ></button>
            ))}
        </div>
    )
}

export default ColorModal