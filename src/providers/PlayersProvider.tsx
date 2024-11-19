import React, { useState } from 'react'
import { Player, ProviderProps } from '@/types';
import PlayersContext from '@/contexts/PlayersContext';



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
