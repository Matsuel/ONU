import Button from "./Button";
import {
    emitStartGame,
    onStartGame,
  } from "@/utils/socketEvents";
import { useEffect } from "react";
import { useRouter } from "next/router";


interface CreateUuidOptionProps {
    uuid: string;
}

const CreateUuidOption = ({uuid}: CreateUuidOptionProps) => {
    const router = useRouter();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(uuid);
      };
    
      useEffect(() => {
    
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
        <div className="flex flex-col items-center">
            <p className="text-white font-bold">uuid: {uuid}</p>
            <div className="flex gap-4">
              <Button label="Copier le code de la partie" onClick={copyToClipboard} />
              <Button label="Commencer la partie" onClick={() => emitStartGame(uuid)} />
            </div>
          </div>
    );
}

export default CreateUuidOption;