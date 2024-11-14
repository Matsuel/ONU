import React from "react"
import Title from "@/components/ui/Title"
import CustomLink from "@/components/ui/CustomLink"


export default function Home() {
    return (
        <div className='text-white h-screen w-screen'>
            <Title title='ONU' />
            <div className='flex gap-4 flex-row items-center pt-52 justify-evenly'>
                <div className="flex flex-col items-center gap-4">
                    <h2 className="text-4xl font-semibold">Rejoindre une partie</h2>
                    <CustomLink href="/join" label="Rejoindre une partie" />
                </div>
                <div className="flex flex-col items-center gap-4">
                    <h2 className="text-4xl font-semibold">Créer une partie</h2>
                    <CustomLink href="/create" label="Créer une partie" />
                </div>
            </div>
        </div>
    )
}
