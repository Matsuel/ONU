import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeLayout from "@/components/home/HomeLayout";
import { containerVariants } from "@/constantes/home";
import Create from "@/components/home/Create";
import Join from "@/components/home/Join";
import BackgroundLayout from "@/components/home/BackgroundLayout";

export default function Home() {
    const [isExiting, setIsExiting] = useState(false);
    const [page, setPage] = useState<"home" | "join" | "create">("home");

    const handleNavigation = (page: "home" | "join" | "create") => {
        setIsExiting(true);
        setTimeout(() => {
            setPage(page);
            setIsExiting(false);
        }, 500);
    }


    return (
        <AnimatePresence mode="wait">
            {!isExiting && (
                <motion.div
                    className="text-white h-screen w-screen flex flex-row"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <BackgroundLayout title="ONU" subtitle="Bienvenue sur le jeu du UNO">
                        {page === "home" ? (
                            <HomeLayout handleNavigation={handleNavigation} />
                        ) : page === "join" ? (
                            <Join />
                        ) : (
                            <Create />
                        )}
                    </BackgroundLayout>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
