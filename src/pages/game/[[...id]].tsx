import React, { useContext, useEffect } from "react";
import Deck from "@/components/structs/Deck";
import Players from "@/components/structs/Player";
import Pit from "@/components/structs/Pit";
import { socket } from "../_app";
import { useRouter } from "next/router";
import { GameContext } from "@/providers/GameProvider";
import { PlayersContext } from "@/providers/PlayersProvider";
import { LoadingContext } from "@/providers/LoadingProvider";
import useGame from "@/hooks/useGame";
import useTimer from "@/hooks/useTimer";

export default function Game() {

    const { isTurnDirectionClockwise, setIsTurnDirectionClockwise, nmbCardsToDraw, setNmbCardsToDraw, uuid, setUuid } = useContext(GameContext)
    const { playerTurn, players, timer } = useContext(PlayersContext);
    const { loading, setLoading } = useContext(LoadingContext);

    const router = useRouter();
    const { id } = router.query;

    useGame();


    // TODO:
    // - Ajouter toutes les props de base dans la partie lors de sa création isTurnDirectionClockwise, nmbCardsToDraw

    useEffect(() => {
        const playerUuid = sessionStorage.getItem("uuid");
        if (playerUuid) {
            setUuid(playerUuid);
        } else {
            router.push("/");
        }
    }, [router, setUuid]);

    useEffect(() => {
        if (id) {
            setLoading(true);
            socket.emit("getGame", { id: id[0], uuid });
        }
    }, [uuid, id, setLoading]);

    useTimer({ id: id ? id[0] : undefined, uuid });
    useEffect(() => {
        socket.on("gameOver", (data) => {
            console.error(data);
        });
    }, [router]);

    if (!id || !uuid || loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col bg-black w-screen min-h-screen text-white">
            {players[playerTurn].uuid === uuid && (
                <div className="bg-white text-black">
                    <h1>{timer}</h1>
                </div>
            )}
            <Players
                uuid={id[0] as string}
            />

            <Deck
                uuid={id[0] as string}
            />

            <Pit />
        </div>
    );
}
