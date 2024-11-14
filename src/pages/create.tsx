import React from "react";
import Title from "@/components/ui/Title";
import CreateOption from "@/components/createOption/CreateOption";

export default function Create() {
    return (
        <div className="min-h-screen">
            <Title title="Création de partie" />
            <CreateOption />
        </div>
    );
}
