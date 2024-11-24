import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/home/Sidebar";
import HomeLayout from "@/components/home/HomeLayout";
import { containerVariants } from "@/constantes/home";

export default function Home() {
    const [isExiting, setIsExiting] = useState(false);
    const [page, setPage] = useState<"home" | "join" | "create">("home");


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
                    <Sidebar setPage={setPage} />

                    {page === "home" ? (
                        <HomeLayout />
                    ) : page === "join" ? (
                        null
                    ) : (
                        null
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
