import { useContext, useEffect } from 'react'
import { drawCard } from '@/utils/cardsFunction';
import PlayersContext from '@/contexts/PlayersContext';
import DeckContext from '@/contexts/DeckContext';
import PitContext from '@/contexts/PitContext';

interface TimerProps {
    id: string | undefined;
    uuid: string;
}

const useTimer = ({
    id,
    uuid
}: TimerProps) => {

    const { players, playerTurn, setTimer } = useContext(PlayersContext);
    const { deck } = useContext(DeckContext);
    const { pit } = useContext(PitContext);

    useEffect(() => {
        if (!uuid || players.length === 0 || !id) return;
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev === 0 && players[playerTurn].uuid === uuid) {
                    drawCard(deck, pit, players, playerTurn, id);
                    clearInterval(interval);
                    return 30;
                }
                if (prev === 0) {
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);

    }, [playerTurn, players, uuid, id, deck, pit, setTimer]);
}

export default useTimer
