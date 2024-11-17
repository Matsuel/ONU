import { ProviderProps } from '@/types';
import React, { createContext, useState } from 'react'

interface GameContextType {
    uuid: string;
    setUuid: React.Dispatch<React.SetStateAction<string>>;
    ended: boolean;
    setEnded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GameContext = createContext({} as GameContextType)

const GameProvider = ({
    children
}: ProviderProps) => {
    const [uuid, setUuid] = useState("");
    const [ended, setEnded] = useState(false);


    return (
        <GameContext.Provider value={{ uuid, setUuid, ended, setEnded }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameProvider