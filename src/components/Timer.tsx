import useTimer from '@/hooks/useTimer';
import { GameContext } from '@/providers/GameProvider';
import { PlayersContext } from '@/providers/PlayersProvider';
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