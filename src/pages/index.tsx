import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Title from "@/components/ui/Title";
import Button from "@/components/ui/Button";

export default function Home() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const handleNavigation = (path: string) => {
    setIsExiting(true);
    setTimeout(() => {
      router.push(path);
    }, 500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2 } },
    exit: { opacity: 0, transition: { duration: 1.2 } },
  };

  const sidebarVariants = {
    hidden: { opacity: 0, x: "-100vw" },
    visible: { opacity: 1, x: 0, transition: { duration: 1.2 } },
    exit: { opacity: 0, x: "-100vw", transition: { duration: 1.2 } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: "-100vh" },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2 } },
    exit: { opacity: 0, y: "-100vh", transition: { duration: 1.2 } }, 
  };

  const imageVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1.2 } },
    exit: { scale: 0, opacity: 0, transition: { duration: 1.2 } },
  };

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          className="text-white h-screen w-screen flex flex-row gap-96"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="flex flex-col gap-7 m-4 rounded-xl bg-[#424242] bg-opacity-55 p-4 w-1/6"
            variants={sidebarVariants}
          >
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-2xl text-center pt-5">OPTIONS</h4>
              <div className="border border-white mx-4"></div>
            </div>
            <div className="flex flex-col gap-5">
              <Button
                label="Créer une partie"
                onClick={() => handleNavigation("/create")}
              />
              <Button
                label="Rejoindre une partie"
                onClick={() => handleNavigation("/join")}
              />
            </div>
          </motion.div>
          <motion.div
            className="flex flex-col gap-48 items-center"
            variants={containerVariants}
          >
            <motion.div variants={titleVariants}>
              <Title title="ONU" />
            </motion.div>
            <div className="flex flex-col items-center gap-10">
              <motion.div
                className="felx flex-col text-center"
                variants={containerVariants}
              >
                <h2 className="font-semibold text-3xl">
                  Bienvenue sur le jeu du UNO
                </h2>
                <h3 className="font-semibold text-3xl">
                  Sélectionnez une option pour continuer !
                </h3>
              </motion.div>
              <motion.div variants={imageVariants}>
                <Image
                  src="/Home/home_pic.png"
                  alt="Home Picture"
                  width={300}
                  height={300}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
