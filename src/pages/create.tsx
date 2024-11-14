import React from "react";
import Title from "@/components/Title";
import CreateOption from "@/components/CreateOption";

export default function Create() {
    return (
        <div style={{ backgroundImage: "url(/Home/background.png)" }} className="min-h-screen">
            <Title title="Création de partie" />
            <CreateOption />
        </div>
    );
}
