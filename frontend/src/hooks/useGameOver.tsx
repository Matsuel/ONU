import { socket } from '@/pages/_app';
import GameContext from '@/contexts/GameContext';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react'
import LoadingContext from '@/contexts/LoadingContext';

const useGameOver = () => {

    const router = useRouter();
    const { setEnded, setWinner } = useContext(GameContext)
    const { setLoading } = useContext(LoadingContext)

    useEffect(() => {
        socket.on("gameOver", (data) => {
            setLoading(true);
            setWinner(data.winner.name);
            setEnded(true);
            setLoading(false);
        });
    }, [router, setEnded, setWinner]);
}

export default useGameOver
