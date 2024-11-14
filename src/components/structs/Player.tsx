import Card from "@/components/card/Card";
import { useContext } from "react";
import { PlayersContext } from "@/providers/PlayersProvider";
import Cards from "@/interface/cards";

interface PlayersProps {
    uuid: string;
}

const Players = ({
    uuid,
}: PlayersProps) => {


    const { players, playerTurn } = useContext(PlayersContext);

    return (
        <div>
            <p className="text-red-700 text-2xl">
                Au tour de {players[playerTurn]?.name}
            </p>

            {players.map((player, index) => (
                <div key={index}>
                    <p>{player.name}</p>
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
            ))}
        </div>
    );
};

export default Players;