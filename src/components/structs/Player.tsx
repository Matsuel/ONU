import { useContext } from "react";
import PlayersContext from "@/contexts/PlayersContext";
import PlayersPlacement from "./PlayersPlacement";

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
                <PlayersPlacement player={player} index={index} key={index} uuid={uuid} />
            ))}
        </div>
    );
};

export default Players;
