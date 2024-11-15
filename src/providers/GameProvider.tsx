import { ProviderProps } from '@/types';
import React, { createContext, useState } from 'react'

interface GameContextType {
    isTurnDirectionClockwise: boolean;
    setIsTurnDirectionClockwise: React.Dispatch<React.SetStateAction<boolean>>;
    nmbCardsToDraw: number;
    setNmbCardsToDraw: React.Dispatch<React.SetStateAction<number>>;
    uuid: string;
    setUuid: React.Dispatch<React.SetStateAction<string>>;
    ended: boolean;
    setEnded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GameContext = createContext({} as GameContextType)

const GameProvider = ({
    children
}: ProviderProps) => {

    const [isTurnDirectionClockwise, setIsTurnDirectionClockwise] = useState(true);
    const [nmbCardsToDraw, setNmbCardsToDraw] = useState(0);
    const [uuid, setUuid] = useState("");
    const [ended, setEnded] = useState(false);


    return (
        <GameContext.Provider value={{ isTurnDirectionClockwise, setIsTurnDirectionClockwise, nmbCardsToDraw, setNmbCardsToDraw, uuid, setUuid, ended, setEnded }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameProvider