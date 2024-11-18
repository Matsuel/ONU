import { socket } from '@/pages/_app';
import { GameContext } from '@/providers/GameProvider';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'

const useGameOver = () => {

    const router = useRouter();
    const { setEnded, setWinner } = useContext(GameContext)

    useEffect(() => {
        socket.on("gameOver", (data) => {
            setEnded(true);
            setWinner(data.winner);
        });
    }, [router]);
}

export default useGameOver