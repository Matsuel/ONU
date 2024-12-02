import { colorsHex } from '@/constantes/colors'
import GameContext from '@/contexts/GameContext'
import PitContext from '@/contexts/PitContext'
import Image from 'next/image'
import React, { useContext } from 'react'

const CurrentColor = () => {

    const { pit } = useContext(PitContext)
    const { isClockWise } = useContext(GameContext)

    return (
        <div className="w-16 h-auto flex items-center justify-center">
            {pit && (

                <div className="w-10 h-10 rounded-xl rotate-45 flex items-center justify-center" style={{ backgroundColor: colorsHex[pit.peek().color as keyof typeof colorsHex] }}>
                    <Image
                        src={`/Game/${isClockWise ? "clockwise" : "notclockwise"}.svg`}
                        className='rotate-[-45deg]'
                        width={30}
                        height={30}
                        alt="clockwise"
                    />
                </div>
            )}
        </div>
    )
}

export default CurrentColor