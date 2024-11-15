import Card from "@/components/card/Card";
import { useContext } from "react";
import { PlayersContext } from "@/providers/PlayersProvider";
import Cards from "@/interface/cards";
import Player from "@/interface/player";
import { GameContext } from "@/providers/GameProvider";

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
                <PLayerDivPlacement player={player} index={index} key={index} uuid={uuid}/>
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
    const { uuid: playerUuid } = useContext(GameContext);
    const className = `absolute ${playerUuid === player.uuid ? "bottom-0" : "top-0"} -translate-x-[50%] left-[50%] flex no-wrap`;

    return  (
        <div key={index} className={className}>
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
