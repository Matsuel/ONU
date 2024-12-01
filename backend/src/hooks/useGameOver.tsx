import { socket } from '@/pages/_app';
import GameContext from '@/contexts/GameContext';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react'

const useGameOver = () => {

    const router = useRouter();
    const { setEnded, setWinner } = useContext(GameContext)

    useEffect(() => {
        socket.on("gameOver", (data) => {
            setEnded(true);
            setWinner(data.winner);
        });
    }, [router, setEnded, setWinner]);
}

export default useGameOver
