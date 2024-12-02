import { socket } from '@/pages/_app';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react'
import { LinkedList } from '@/structs/linkedArray';
import { Stack } from '@/structs/stack';
import { Cards, Player } from '@/types';
import PlayersContext from '@/contexts/PlayersContext';
import DeckContext from '@/contexts/DeckContext';
import PitContext from '@/contexts/PitContext';
import LoadingContext from '@/contexts/LoadingContext';
import GameContext from '@/contexts/GameContext';

const useGame = () => {
    const router = useRouter()
    const { setPlayerTurn, setPlayers, setTimer } = useContext(PlayersContext)
    const { setLoading } = useContext(LoadingContext)
    const { setDeck } = useContext(DeckContext)
    const { setPit } = useContext(PitContext)
    const { setEnded, uuid, setIsClockWise } = useContext(GameContext)

    const { id } = router.query

    useEffect(() => {
        socket.on("getGame", (data) => {
            console.log(data);
            setIsClockWise(data.game.isTurnDirectionClockwise);
            setPlayerTurn(data.game.playerTurn);
            setTimer(30);
            const newDeck = new LinkedList<Cards>();
            newDeck.fromJSON(data.game.deck);
            setPit(new Stack(data.game.pit.stack));
            setDeck(newDeck);
            setPlayers(data.game.players as Player[]);
            setLoading(false);
        });
    }, [setPlayerTurn, setTimer, setDeck, setPit, setPlayers, setLoading, router]);

    useEffect(() => {
        if (id) {
            setLoading(true);
            setEnded(false);
            socket.emit("getGame", { id: id[0] as string, uuid });
        }
    }, [router, setLoading, setEnded, id, uuid]);
}

export default useGame
