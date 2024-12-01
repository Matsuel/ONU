import { colorsHex } from '@/constantes/colors'
import PitContext from '@/contexts/PitContext'
import React, { useContext } from 'react'

const CurrentColor = () => {

    const { pit } = useContext(PitContext)

    return (
        <div className="w-16 h-auto flex items-center justify-center">
            {pit && (
                <div className="w-10 h-10 rounded-xl rotate-45" style={{ backgroundColor: colorsHex[pit.peek().color as keyof typeof colorsHex] }} />
            )}
        </div>
    )
}

export default CurrentColor