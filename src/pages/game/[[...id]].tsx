import React, { useContext } from "react";
import Deck from "@/components/structs/Deck";
import Players from "@/components/structs/Player";
import Pit from "@/components/structs/Pit";
import { useRouter } from "next/router";
import useGame from "@/hooks/useGame";
import EndGame from "@/components/EndGame";
import useUuid from "@/hooks/useUuid";
import useGameOver from "@/hooks/useGameOver";
import Timer from "@/components/Timer";
import GameContext from "@/contexts/GameContext";
import LoadingContext from "@/contexts/LoadingContext";

export default function Game() {

    const { uuid, ended } = useContext(GameContext)
    const { loading } = useContext(LoadingContext);

    const router = useRouter();
    const { id } = router.query;

    useGame();
    useUuid();
    useGameOver();

    if (!id || !uuid || loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col bg-black w-screen min-h-screen text-white relative">

            {ended && <EndGame winner={"m"} />}
            <Timer />

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
