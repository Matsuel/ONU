import { useContext } from "react";
import PlayersContext from "@/contexts/PlayersContext";
import PlayersPlacement from "./PlayersPlacement";
import GameContext from "@/contexts/GameContext";
import { Player } from "@/types";

interface PlayersProps {
    uuid: string;
}

const Players = ({
    uuid,
}: PlayersProps) => {
    const { players } = useContext(PlayersContext);
    const { uuid: playerUuid } = useContext(GameContext);

    const sortWithClientAtIndex0 = (players: Player[], playerUuid: string): Player[] => {
        const targetIndex = players.findIndex(player => player.uuid === playerUuid);

        if (targetIndex === -1) {
            throw new Error(`Player with UUID ${playerUuid} not found`);
        }

        return [
            players[targetIndex],
            ...players.slice(0, targetIndex),
            ...players.slice(targetIndex + 1)
        ];
    };

    const sortedPlayers = sortWithClientAtIndex0(players, playerUuid);

    return (
        <div>
            {sortedPlayers.map((player, index) => (
                <PlayersPlacement player={player} index={index} key={index} uuid={uuid} sortedPlayers={sortedPlayers}/>
            ))}
        </div>
    );
};

export default Players;
