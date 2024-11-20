import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Title from "@/components/ui/Title";
import Button from "@/components/ui/Button";

export default function Home() {
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    setIsExiting(true);

    setTimeout(() => {
      router.push(path);
    }, 800);
  };

  return (
    <div className="text-white h-screen w-screen">
      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8 }}
          >
            <Title title="ONU" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-4 flex-row items-center pt-52 justify-evenly">
        <AnimatePresence mode="wait">
          {!isExiting && (
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl font-semibold">Rejoindre une partie</h2>
              <Button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                onClick={() => handleNavigation("/join")}
              >
                Rejoindre une partie
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!isExiting && (
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-4xl font-semibold">Créer une partie</h2>
              <Button
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                onClick={() => handleNavigation("/create")}
              >
                Créer une partie
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
