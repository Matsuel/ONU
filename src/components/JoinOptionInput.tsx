import React, { useState, useEffect } from "react";
import { onJoinGame, onStartGame } from "@/utils/socketEvents";
import { useRouter } from "next/router";

const JoinOptionInput = () => {
  const [uuid, setUuid] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    onJoinGame((msg) => {
      if (msg.status) {
        setMessage(msg.uuid);
        setUuid(msg.uuid);
        sessionStorage.setItem("uuid", msg.playerUuid);
      } else {
        setMessage(msg.message);
      }
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

    return(
        <div>
            <p className="flex justify-center">uuid: {message}</p>
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-black"
                    />
                <input
                    type="text"
                    placeholder="Game uuid"
                    onChange={(e) => setUuid(e.target.value)}
                    className="text-black"
                    />
            </div>
        </div>
    )
}

export default JoinOptionInput;