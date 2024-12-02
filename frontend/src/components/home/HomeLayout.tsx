import React from 'react'
import Title from '@/components/ui/Title'
import { motion } from 'framer-motion'
import { containerVariants, imageVariants, titleVariants } from '@/constantes/home'
import TabTitle from '../game/TabTitle'
import Button from '../ui/Button'

const HomeLayout = () => {

    return (
        <motion.div
            className="flex flex-col pl-24 w-full bg-no-repeat bg-right bg-contain"
            style={{backgroundImage: "url('/Home/cards.png')"}}
            variants={containerVariants}
        >
            <TabTitle title="ONU" />
            <motion.div variants={titleVariants}>
                <Title title="ONU" />
            </motion.div>
            <div className="flex flex-col gap-10">
                <motion.div
                    className="felx flex-col"
                    variants={containerVariants}
                >
                    <h2 className="font-semibold text-3xl">
                        Bienvenue sur le jeu du UNO
                    </h2>
                </motion.div>
            </div>
            <motion.div
                className="flex flex-col pt-24 gap-4"
                variants={containerVariants}
            >
                <h3 className='font-bold text-2xl'>OPTIONS</h3>
                <div className="flex flex-col gap-6">
                    <Button label="Rejoindre une partie" className="w-1/4" />
                    <Button label="Créer une partie" className="w-1/4" />
                </div>
            </motion.div>
        </motion.div>
    )
}

export default HomeLayout
