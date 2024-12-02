import React from "react";
import JoinOption from "@/components/ui/JoinOption";
import { motion } from 'framer-motion'
import { containerVariants } from "@/constantes/home";


export default function Join() {
    return (
        <motion.div
            className="min-h-screen w-5/6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <JoinOption />
        </motion.div>
    );
}
