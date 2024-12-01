import React from "react";
import Title from "@/components/ui/Title";
import JoinOption from "@/components/ui/JoinOption";
import { motion } from 'framer-motion'
import { containerVariants, titleVariants } from "@/constantes/home";
import TabTitle from "../game/TabTitle";


export default function Join() {
    return (
        <motion.div
            className="min-h-screen w-5/6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <TabTitle title="Rejoindre une partie" />
            <motion.div className=" flex flex-col" variants={titleVariants}>
                <Title title="Rejoindre" />
                <h2 className="flex justify-center font-semibold text-7xl drop-shadow-2xl">une partie</h2>
            </motion.div>
            <JoinOption />
        </motion.div>
    );
}
