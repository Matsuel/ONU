import React, { useContext } from "react";
import Deck from "@/components/structs/Deck";
import Players from "@/components/structs/Player";
import Pit from "@/components/structs/Pit";
import { useRouter } from "next/router";
import { GameContext } from "@/providers/GameProvider";
import { PlayersContext } from "@/providers/PlayersProvider";
import { LoadingContext } from "@/providers/LoadingProvider";
import useGame from "@/hooks/useGame";
import useTimer from "@/hooks/useTimer";
import EndGame from "@/components/EndGame";
import useUuid from "@/hooks/useUuid";
import useGameOver from "@/hooks/useGameOver";

export default function Game() {

    const { uuid, ended } = useContext(GameContext)
    const { playerTurn, players, timer } = useContext(PlayersContext);
    const { loading } = useContext(LoadingContext);

    const router = useRouter();
    const { id } = router.query;

    useGame();
    useUuid();
    useGameOver();
    useTimer({ id: id ? id[0] : undefined, uuid });

    if (!id || !uuid || loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col bg-black w-screen min-h-screen text-white relative">

            {ended && <EndGame winner={"m"} />}
            {players[playerTurn].uuid === uuid && (
                <div className="bg-white text-black fixed">
                    <h1>{timer}</h1>
                </div>
            )}

            <Players
                uuid={id[0] as string}
            />

            <div className="fixed flex flex-row ga-x-5 left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%]">
                <Deck
                    uuid={id[0] as string}
                />

                <Pit />
            </div>

        </div>
    );
}
