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
        if (players[0].uuid === playerUuid) return players;

        let index = 0;
        const sortedPlayers: Player[] = [];

        for (let i = 0; i < players.length; i++) {
            if (players[i].uuid === playerUuid) {
                sortedPlayers.push(players[i]);
                index = i + 1;
                break;
            }
        }

        for (let i = index; i < players.length; i++) {
            sortedPlayers.push(players[i]);
        }

        let includes = false;

        for (let i = 0; i < players.length; i++) {
            for (let j = 0; j < sortedPlayers.length; j++) {
                if (players[i].uuid === sortedPlayers[j].uuid) {
                    includes = true;
                    break;
                }
            }

            if (!includes) {
                sortedPlayers.push(players[i]);
            }
        }

        if (sortedPlayers.length !== players.length) {
            throw new Error("Length must be the same");
        }

        return sortedPlayers;
    }

    const sortedPlayers = sortWithClientAtIndex0(players, playerUuid);

    return (
        <div>
            {sortedPlayers.map((player, index) => (
                <PlayersPlacement player={player} index={index} key={index} uuid={uuid} />
            ))}
        </div>
    );
};

export default Players;
