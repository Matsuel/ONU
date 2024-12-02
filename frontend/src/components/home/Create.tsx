import React from "react";
import CreateOption from "@/components/home/createOption/CreateOption";
import { motion } from 'framer-motion'
import { containerVariants } from "@/constantes/home";

export default function Create() {
    return (
        <motion.div
            className="min-h-screen w-5/6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <CreateOption />
        </motion.div>
    );
}
