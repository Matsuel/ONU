import Button from "./Button"
import {
    emitCreateGame,
  } from "@/utils/socketEvents";
import { useState } from "react";

const CreateGameOption = () => {
    const [username, setUsername] = useState("");
    return(
        <div className="flex flex-col items-center gap-4">
            <input
            type="text"
            placeholder="Nom d'utilisateur"
            onChange={(e) => setUsername(e.target.value)}
            className="text-black"
            />
            <Button label="Créer la partie" onClick={() => emitCreateGame(username)} />
        </div>
    );
}

export default CreateGameOption;