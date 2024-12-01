import GameContext from '@/contexts/GameContext';
import { ProviderProps } from '@/types';
import React, { useState } from 'react'


const GameProvider = ({
    children
}: ProviderProps) => {
    const [uuid, setUuid] = useState("");
    const [ended, setEnded] = useState(false);
    const [winner, setWinner] = useState("");


    return (
        <GameContext.Provider value={{ uuid, setUuid, ended, setEnded, winner, setWinner }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameProvider