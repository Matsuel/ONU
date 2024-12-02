import { useContext } from "react";
import Deck from "@/components/game/Deck";
import Players from "@/components/game/Player";
import Pit from "@/components/game/Pit";
import { useRouter } from "next/router";
import useGame from "@/hooks/useGame";
import EndGame from "@/components/game/EndGame";
import useUuid from "@/hooks/useUuid";
import useGameOver from "@/hooks/useGameOver";
import GameContext from "@/contexts/GameContext";
import LoadingContext from "@/contexts/LoadingContext";
import Loader from "@/components/ui/Loader";
import GameInfos from "@/components/game/GameInfos";
import TabTitle from "@/components/game/TabTitle";

export default function Game() {
    const { uuid, ended, winner } = useContext(GameContext)
    const { loading } = useContext(LoadingContext);

    const router = useRouter();
    const { id } = router.query;

    useGame();
    useUuid();
    useGameOver();

    if (!id || !uuid || loading) return <Loader />;

    if (ended && winner) return <EndGame winner={winner} />;

    return (
        <div className="flex flex-col w-screen min-h-screen text-white relative">
            <TabTitle title="Partie" />

            <Players
                uuid={id[0] as string}
            />

            <div className="fixed flex flex-row ga-x-5 gap-5 left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%]">
                <Deck
                    uuid={id[0] as string}
                />

                <GameInfos />

                <Pit />
            </div>

        </div>
    );
}
