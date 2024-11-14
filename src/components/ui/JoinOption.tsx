import React, { useEffect, useState } from "react";
import { emitJoinGame, onJoinGame, onStartGame } from "@/utils/socketEvents";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";
import Trash from "@/assets/Trash";
import Clipboard from "@/assets/Clipboard";
import Input from "./Input";

const JoinOption = () => {
    const [username, setUsername] = useState("");
    const [uuid, setUuid] = useState("");
    const [gameUuid, setGameUuid] = useState("");

    const [message, setMessage] = useState("");
    const router = useRouter();

    const clipboardToUUID = () => {
        navigator.clipboard.readText().then((text) => {
            setUuid(text);
        });
    };

    const clearUUID = () => {
        setUuid("");
    };

    useEffect(() => {
        onJoinGame((msg) => {
            if (msg.status) {
                setMessage(msg.uuid);
                setGameUuid(msg.uuid);
                sessionStorage.setItem("uuid", msg.playerUuid);
            } else {
                setMessage(msg.message);
            }
        });

        onStartGame((msg) => {
            if (msg.uuid) {
                setGameUuid(msg.uuid);
                router.push({ pathname: `/game/${msg.uuid}` });
            } else {
                console.error("Game not found");
            }
        });
    }, [router]);

    return (
        <div className="flex flex-col gap-4 items-center pt-64">
            {message && <p className="flex justify-center">Status de la partie: {message}</p>}
            <div className="flex flex-row items-center justify-center gap-4">
                <Input
                    type="text"
                    placeholder="Game uuid"
                    onChange={(e) => setUuid(e.target.value)}
                    value={uuid}
                />
                <Button className="w-10 h-10 flex items-center justify-center p-0" onClick={clipboardToUUID}>
                    <Clipboard fill="white" size={20} />
                </Button>

                <Button className="w-10 h-10 flex items-center justify-center p-0" onClick={clearUUID}>
                    <Trash fill="white" size={20} />
                </Button>
            </div>

            <Input
                type="text"
                placeholder="Nom d'utilisateur"
                onChange={(e) => setUsername(e.target.value)}
                className="text-black w-full"
            />

            <Button label="Rejoindre la partie" onClick={() => emitJoinGame(uuid, username)} />
        </div>
    )
}

export default JoinOption;
