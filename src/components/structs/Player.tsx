import Card from "@/components/card/Card";
import { useContext } from "react";
import { Cards, Player } from "@/types";
import PlayersContext from "@/contexts/PlayersContext";

interface PlayersProps {
    uuid: string;
}

const Players = ({
    uuid,
}: PlayersProps) => {
    const { players } = useContext(PlayersContext);

    return (
        <div>
            {players.map((player, index) => (
                <PLayerDivPlacement player={player} index={index} key={index} uuid={uuid} />
            ))}
        </div>
    );
};

interface PLayerDivPlacementProps {
    player: Player;
    index: number;
    uuid: string;
}

const PLayerDivPlacement = ({ player, index, uuid }: PLayerDivPlacementProps) => {
    let className = "fixed flex justify-center ";
    const bottomPlacement = "w-screen bottom-0";
    const topPlacement = "w-screen top-0";
    const leftPlacement = "h-screen flex-col left-0";
    const rightPlacement = "h-screen flex-col right-0";
    const playersPlacement = [bottomPlacement, topPlacement, leftPlacement, rightPlacement];

    className += playersPlacement[index];

    return (
        <div key={index} className={className}>
            {player.name}
            {player.cards.map((card: Cards, cardIndex: number) => (
                <Card
                    key={cardIndex}
                    card={card}
                    cardIndex={cardIndex}
                    player={player}
                    uuid={uuid}
                    playerIndex={index}
                />
            ))}
        </div>
    )
}

export default Players;
