import React from 'react'
import Title from '@/components/ui/Title'
import { motion } from 'framer-motion'
import { containerVariants, imageVariants, titleVariants } from '@/constantes/home'
import TabTitle from '../game/TabTitle'
import CardDisplay from '../game/card/CardDisplay'
import CardsRow from '../game/card/CardsRow'

const HomeLayout = () => {

    return (
        <motion.div
            className="flex flex-col gap-48 items-center w-5/6"
            variants={containerVariants}
        >
            <TabTitle title="ONU" />
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
                </motion.div>
                
                <CardsRow />
            </div>
        </motion.div>
    )
}

export default HomeLayout
