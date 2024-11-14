import Button from "./Button"
import { emitCreateGame } from "@/utils/socketEvents";
import { useState } from "react";
import Input from "./Input";

const CreateGameOption = () => {
    const [username, setUsername] = useState("");
    return (
        <div className="w-full flex flex-col items-center gap-4">
            <Input
                autoFocus
                className="w-[50%] text-center font-semibold text-2xl"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <Button
                label="Créer la partie"
                onClick={() => emitCreateGame(username)}
            />
        </div>
    );
}

export default CreateGameOption;