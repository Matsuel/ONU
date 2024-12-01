import { useState, useEffect } from "react";
import { onCreateGame, onStartGame } from "@/utils/socketEvents";
import { useRouter } from "next/router";
import CreateGameOption from "@/components/home/createOption/Game";
import CreateUuidOption from "@/components/home/createOption/Uuid";

const CreateOption = () => {
    const router = useRouter();
    const [uuid, setUuid] = useState("");
    const [pin, setPin] = useState(0);


    useEffect(() => {
        onCreateGame((msg) => {
            console.log("onCreateGame", msg);
            setUuid(msg.uuid);
            setPin(msg.pin);
            sessionStorage.setItem("uuid", msg.playerUuid);
        });

        onStartGame((msg) => {
            if (msg.uuid) {
                router.push({ pathname: `/game/${msg.uuid}` });
            } else {
                console.error("Game not found");
            }
        });
    }, [router]);


    return (
        <div className='flex justify-center gap-4 pt-64'>
            {uuid === "" ? (
                <CreateGameOption />
            ) : (
                <CreateUuidOption uuid={uuid} pin={pin} />
            )}
        </div>
    );
}

export default CreateOption;
