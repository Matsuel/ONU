import { socket } from '@/pages/_app';
import { PlayersContext } from '@/providers/PlayersProvider';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react'
import { LinkedList } from '@/structs/linkedArray';
import Cards from '@/interface/cards';
import { DeckContext } from '@/providers/DeckProvider';
import { PitContext } from '@/providers/PitProvider';
import { Stack } from '@/structs/stack';
import { LoadingContext } from '@/providers/LoadingProvider';
import Player from '@/interface/player';
import { GameContext } from '@/providers/GameProvider';

const useGame = () => {

    const router = useRouter()
    const { setPlayerTurn, setPlayers, setTimer } = useContext(PlayersContext)
    const { setLoading } = useContext(LoadingContext)
    const { setDeck } = useContext(DeckContext)
    const { setPit } = useContext(PitContext)
    const { setEnded, uuid } = useContext(GameContext)

    const { id } = router.query


    useEffect(() => {
        socket.on("getGame", (data) => {
            setPlayerTurn(data.game.playerTurn);
            setTimer(30);
            const newDeck = new LinkedList<Cards>();
            newDeck.fromJSON(data.game.deck);
            setPit(new Stack(data.game.pit.stack));
            setDeck(newDeck);
            setPlayers(data.game.players as Player[]);
            setLoading(false);
        });
    }, [router, setDeck, setPlayerTurn, setPlayers, setPit, setLoading, setTimer]);

    useEffect(() => {
        if (id) {
            setLoading(true);
            setEnded(false);
            socket.emit("getGame", { id: id[0] as string, uuid });
        }

        return () => {
            socket.off("getGame");
        }
    }, [router, setLoading, setEnded, id, uuid]);
}

export default useGame
