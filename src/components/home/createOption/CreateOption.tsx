import { useState, useEffect } from "react";
import { onCreateGame, onStartGame } from "@/utils/socketEvents";
import { useRouter } from "next/router";
import CreateGameOption from "@/components/home/createOption/Game";
import CreateUuidOption from "@/components/home/createOption/Uuid";

const CreateOption = () => {
    const router = useRouter();
    const [uuid, setUuid] = useState("");


    useEffect(() => {
        onCreateGame((msg) => {
            setUuid(msg.uuid);
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
                <CreateUuidOption uuid={uuid} />
            )}
        </div>
    );
}

export default CreateOption;
