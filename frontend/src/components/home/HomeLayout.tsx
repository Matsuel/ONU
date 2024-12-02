import React from 'react'
import { motion } from 'framer-motion'
import { containerVariants } from '@/constantes/home'
import Button from '../ui/Button'

interface Props {
    handleNavigation: (page: "home" | "join" | "create") => void
}

const HomeLayout = ({
    handleNavigation
}: Props) => {

    return (
        <motion.div
            className="flex flex-col pl-24 w-full bg-no-repeat"
            variants={containerVariants}
        >
            <motion.div
                className="flex flex-col pt-24 gap-4"
                variants={containerVariants}
            >
                <h3 className='font-bold text-2xl'>OPTIONS</h3>
                <div className="flex flex-col gap-6">
                    <Button label="Rejoindre une partie" className="w-1/4" onClick={() => handleNavigation("join")} />
                    <Button label="Créer une partie" className="w-1/4" onClick={() => handleNavigation("create")} />
                </div>
            </motion.div>
        </motion.div>
    )
}

export default HomeLayout
