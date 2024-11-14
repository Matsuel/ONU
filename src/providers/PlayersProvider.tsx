import React, { createContext, useState } from 'react'
import Player from '../../interface/player';
import { ProviderProps } from '@/types';

interface PlayersContextType {
    players: Player[],
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
    playerTurn: number,
    setPlayerTurn: React.Dispatch<React.SetStateAction<number>>,
    timer: number,
    setTimer: React.Dispatch<React.SetStateAction<number>>
}


export const PlayersContext = createContext({} as PlayersContextType)

const PlayersProvider = ({
    children
}: ProviderProps) => {

    const [players, setPlayers] = useState<Player[]>([]);
    const [playerTurn, setPlayerTurn] = useState<number>(0);
    const [timer, setTimer] = useState<number>(30);

    return (
        <PlayersContext.Provider value={{ players, setPlayers, playerTurn, setPlayerTurn, timer, setTimer }}>
            {children}
        </PlayersContext.Provider>
    )
}

export default PlayersProvider