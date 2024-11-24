import React from 'react'
import Image from 'next/image'
import Title from '@/components/ui/Title'
import { motion } from 'framer-motion'
import { containerVariants, imageVariants, titleVariants } from '@/constantes/home'

const HomeLayout = () => {

    return (
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
    )
}

export default HomeLayout