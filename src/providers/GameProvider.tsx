import { ProviderProps } from '@/types';
import React, { createContext, useState } from 'react'

interface GameContextType {
    uuid: string;
    setUuid: React.Dispatch<React.SetStateAction<string>>;
    ended: boolean;
    setEnded: React.Dispatch<React.SetStateAction<boolean>>;
    winner: string;
    setWinner: React.Dispatch<React.SetStateAction<string>>;
}

export const GameContext = createContext({} as GameContextType)

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