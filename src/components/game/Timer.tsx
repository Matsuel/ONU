import useTimer from '@/hooks/useTimer';
import GameContext from '@/contexts/GameContext';
import PlayersContext from '@/contexts/PlayersContext';
import { useRouter } from 'next/router';
import React, { useContext } from 'react'

const Timer = () => {

    const router = useRouter();
    const { id } = router.query;
    const { uuid } = useContext(GameContext)
    const { playerTurn, players, timer } = useContext(PlayersContext);

    useTimer({ id: id ? id[0] : undefined, uuid });

    return (
        players[playerTurn].uuid === uuid && (
            <div className="bg-white text-black fixed">
                <h1>{timer}</h1>
            </div>
        )
    )
}

export default Timer