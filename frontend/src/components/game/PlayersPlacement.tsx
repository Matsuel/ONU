import PlayersContext from "@/contexts/PlayersContext";
import { Cards, Player } from "@/types";
import { useContext } from "react";
import Card from "@/components/game/card/Card";

interface PLayerDivPlacementProps {
    player: Player;
    index: number;
    uuid: string;
    sortedPlayers: Player[];
}

const PlayersPlacement = ({
    player,
    index,
    uuid,
    sortedPlayers
}: PLayerDivPlacementProps) => {
    const { players } = useContext(PlayersContext);

    let className = "fixed flex justify-center ";

    let playersPlacement = [""];
    const bottomPlacement = "w-screen bottom-0 -translate-y-[25%] ";
    const topPlacement = "w-screen top-0 translate-y-[25%] ";
    const leftPlacement = "h-screen left-0 -translate-x-[45%] rotate-90 ";
    const rightPlacement = "h-screen right-0 translate-x-[45%] -rotate-90 ";

    if (players.length === 2) {
        playersPlacement = [bottomPlacement, topPlacement];
    } else if (players.length === 3) {
        playersPlacement = [bottomPlacement, leftPlacement, topPlacement];
    } else if (players.length === 4) {
        playersPlacement = [bottomPlacement, leftPlacement, topPlacement, rightPlacement];
    }

    className += playersPlacement[index];

    return (
        <div key={index} className={className}>
            {player.cards.map((card: Cards, cardIndex: number) => (
                <Card
                    key={cardIndex}
                    card={card}
                    cardIndex={cardIndex}
                    player={player}
                    uuid={uuid}
                    sortedPlayers={sortedPlayers}
                />
            ))}
        </div>
    )
}

export default PlayersPlacement;
