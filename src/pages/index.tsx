import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Title from "@/components/ui/Title";
import Button from "@/components/ui/Button";

export default function Home() {
  const router = useRouter();


  return (
    <div className="text-white h-screen w-screen flex flex-row gap-96">
        <div className="flex flex-col gap-7 m-4 rounded-xl bg-[#424242] bg-opacity-55 p-4 w-1/6">
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-2xl text-center pt-5">OPTIONS</h4>
            <div className="border border-white mx-4"></div>
          </div>
          <div className="flex flex-col gap-5">
            <Button
              label="Créer une partie"
              onClick={() => router.push("/create")}
            />
            <Button
              label="Rejoindre une partie"
              onClick={() => router.push("/join")}
            />
          </div>
        </div>
        <div className="flex flex-col gap-48 items-center">
          <Title title="ONU" />
          <div className="flex flex-col items-center gap-10">
            <div className="felx flex-col text-center">
              <h2 className="font-semibold text-3xl">Bienvenue sur le jeu du UNO</h2>
              <h3 className="font-semibold text-3xl">Sélectionnez une option pour continuer !</h3>
            </div>
            <Image
              src="/Home/home_pic.png"
              alt="Home Picture"
              width={300}
              height={300}
            />
          </div>
        </div>
      
    </div>
  );
}
