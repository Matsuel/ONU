import PlayersContext from "@/contexts/PlayersContext";
import { Cards, Player } from "@/types";
import { useContext } from "react";
import Card from "@/components/game/card/Card";
import { divPlacement } from "@/utils/divPlacement";

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

    const className = divPlacement(players, index);

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
