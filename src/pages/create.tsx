import React, { useEffect, useState } from "react";
import Title from "@/components/Title";
import CreateOption from "@/components/CreateOption";

export default function Create() {
<<<<<<< HEAD
  const [uuid, setUuid] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

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
      } else if (msg.message) {
        setError(msg.message);
      } else {
        console.log("Game not found");
      }
    });
  }, []);

  return (
    <div className="flex flex-col justify-start items-start">
      <h1>Création de partie</h1>
      {uuid === "" ? (
        <div>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => emitCreateGame(username)}>
            Créer la partie
          </button>
        </div>
      ) : (
        <div>
          <p>uuid: {uuid}</p>
          <button onClick={copyToClipboard}>Copier le code de la partie</button>
          <button onClick={() => emitStartGame(uuid)}>
            Commencer la partie
          </button>
          {error && <p>{error}</p>}
        </div>
      )}
=======
  return (
    <div style={{backgroundImage: `url(/Home/background.png)`}} className="min-h-screen">
      <Title title="Création de partie" />
      <CreateOption />
>>>>>>> lytzeer
    </div>
  );
}
