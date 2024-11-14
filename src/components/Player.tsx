import Card from "./Card";
import { useContext } from "react";
import { PlayersContext } from "@/providers/PlayersProvider";

interface PlayersProps {
    uuid: string;
}

const Players = ({
    uuid,
}: PlayersProps) => {


    const { players, playerTurn } = useContext(PlayersContext);

    return (
        <div>

            // TODO:
            // Faire un composant de merde
            <p className="text-red-700 text-2xl">
                Au tour de {players[playerTurn]?.name}
            </p>

            {players.map((player, index) => (
                <div key={index}>
                    <p>{player.name}</p>
                    {player.cards.map((card, cardIndex) => (
                        <Card
                            key={cardIndex}
                            card={card}
                            cardIndex={cardIndex}
                            player={player}
                            uuid={uuid}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Players;
