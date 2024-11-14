import React from "react";
import Title from "@/components/ui/Title";
import JoinOption from "@/components/ui/JoinOption";


export default function Join() {
    return (
        <div style={{backgroundImage: "url(/Home/background.png)"}} className="min-h-screen">
            <Title title="Join" />
            <JoinOption />
        </div>
    );
}
