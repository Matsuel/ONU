import React, { useState, useEffect } from "react";
import { emitJoinGame } from "@/utils/socketEvents";
import Button from "@/components/Button";
import JoinOptionInput from "./JoinOptionInput";

const JoinOption = () => {
  const [username, setUsername] = useState("");
  const [uuid, setUuid] = useState("");

    return (
        <div className="flex flex-col gap-4 items-center pt-64">
        <JoinOptionInput />
        <Button label="Rejoindre la partie" onClick={() => emitJoinGame(uuid, username)}/>
      </div>
    )
}

export default JoinOption;