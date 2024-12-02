import React from "react";
import CreateOption from "@/components/home/createOption/CreateOption";
import { motion } from 'framer-motion'
import { containerVariants } from "@/constantes/home";
import Button from "@/components/ui/Button";

interface Props {
    handleNavigation: (page: "home" | "join" | "create") => void
}

export default function Create({
    handleNavigation
}: Props) {
    return (
        <motion.div
            className=""
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <CreateOption />
            <div className="pt-20">
                <Button label="Retour à l'accueil" className="w-1/6" onClick={() => handleNavigation("home")} />
            </div>
        </motion.div>
    );
}
