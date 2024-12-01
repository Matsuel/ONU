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
        <div className="w-10 flex items-center justify-center">
            {players[playerTurn].uuid === uuid && (
                <h1 className={`text-white text-4xl font-semibold ${timer <= 10 && "text-[#ff0000]"}`}>
                    {timer}
                </h1>
            )}
        </div>
    )
}

export default Timer