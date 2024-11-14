import Card from "./Card";
import { useContext } from "react";
import { PlayersContext } from "@/providers/PlayersProvider";
import { GameContext } from "@/providers/GameProvider";

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
                            players={players}
                            playerTurn={playerTurn}
                            uuid={uuid}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Players;
