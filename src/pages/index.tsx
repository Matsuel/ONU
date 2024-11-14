import React from 'react'
import Title from '@/components/Title'
import HomeOptions from '@/components/HomeOptions'


export default function Home() {
    return (
        <div style={{backgroundImage: `url(/Home/background.png)`}} className='min-h-screen'>
            <Title title='ONU' />
            <HomeOptions />
        </div>
    )
}
