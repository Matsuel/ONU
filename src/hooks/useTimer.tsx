import { PlayersContext } from '@/providers/PlayersProvider';
import React, { useContext, useEffect } from 'react'
import { drawCard } from '../../cardsFunction';
import { DeckContext } from '@/providers/DeckProvider';
import { PitContext } from '@/providers/PitProvider';

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
        if (players[playerTurn].uuid === uuid) {
            const interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev === 0) {
                        drawCard(deck, pit, players, playerTurn, 1, id);
                        clearInterval(interval);
                        return 30;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }

    }, [playerTurn, players, uuid, id, deck, pit]);
}

export default useTimer