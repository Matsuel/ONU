import { useState, useEffect } from "react";
import {
    emitStartGame,
    onCreateGame,
    onStartGame,
  } from "@/utils/socketEvents";
import { useRouter } from "next/router";
import Button from "./Button";
import CreateGameOption from "./CreateGameOption";
import CreateUuidOption from "./CreateUuidOption";

const CreateOption = () => {
    const router = useRouter();
    const [uuid, setUuid] = useState("");
    const [username, setUsername] = useState("");

    const copyToClipboard = () => {
        navigator.clipboard.writeText(uuid);
      };
    
      useEffect(() => {
        onCreateGame((msg) => {
          setUuid(msg.uuid);
          sessionStorage.setItem("uuid", msg.playerUuid);
        });
    
        onStartGame((msg) => {
          if (msg.uuid) {
            console.log(msg.uuid);
            router.push({ pathname: `/game/${msg.uuid}` });
          } else {
            console.log("Game not found");
          }
        });
      }, []);
    return (
        <div className='flex justify-center gap-4 pt-64'>
            {uuid === "" ? (
            <CreateGameOption />
            ) : (
            <CreateUuidOption uuid={uuid}/>
        )}
        </div>
    );
}

export default CreateOption;