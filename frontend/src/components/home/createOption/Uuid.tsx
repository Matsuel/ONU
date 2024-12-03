import Button from "@/components/ui/Button";
import {
    emitStartGame,
    onStartGame,
} from "@/utils/socketEvents";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PinNumber from "@/components/ui/PinNumber";
import { socket } from "@/pages/_app";
import { PlayerInLobbyType } from "@/types";

interface CreateUuidOptionProps {
    uuid: string;
    pin: number;
}

const CreateUuidOption = ({ uuid, pin }: CreateUuidOptionProps) => {
    const [playersNameInLobby, setPlayersNameInLobby] = useState<string[]>([]);
    const router = useRouter();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(pin.toString());
    };

    useEffect(() => {
        onStartGame((msg) => {
            if (msg.uuid) {
                router.push({ pathname: `/game/${msg.uuid}` });
            } else {
                console.error("Game not found");
            }
        });
    }, [router]);

    useEffect(() => {
        socket.on("join", (data: PlayerInLobbyType) => {
            setPlayersNameInLobby(data.playersName);
        });
    }, []);

    return (
        <div className="flex flex-col items-center">
            <PinNumber pin={pin} />

            <div className="flex flex-col items-start">
                {playersNameInLobby.map((playerName, index) => (
                    <div 
                        className={`flex flex-col text-xl font-bold ${index % 2 === 0 ? 'bg-red-700' : 'bg-red-200'}`}
                        key={index}
                    >
                        {playerName}
                    </div>
                ))}
            </div>

            <div className="flex gap-4">
                <Button label="Copier le code de la partie" onClick={copyToClipboard} />
                <Button label="Commencer la partie" onClick={() => emitStartGame(uuid)} />
            </div>
        </div>
    );
}

export default CreateUuidOption;
