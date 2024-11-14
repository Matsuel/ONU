import React from "react";
import Title from "@/components/Title";
import JoinOption from "@/components/JoinOption";


export default function Join() {
    return (
        <div style={{backgroundImage: "url(/Home/background.png)"}} className="min-h-screen">
            <Title title="Join" />
            <JoinOption />
        </div>
    );
}
