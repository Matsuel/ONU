import { useState, useEffect } from "react";
import { onCreateGame, onStartGame } from "@/utils/socketEvents";
import { useRouter } from "next/router";
import CreateGameOption from "./CreateGameOption";
import CreateUuidOption from "./CreateUuidOption";

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
        console.log("Game not found");
      }
    });
  }, []);


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