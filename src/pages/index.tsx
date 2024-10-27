import Link from 'next/link'
import React from 'react'


export default function Home() {
    return (
        <div>
            <h1>Home</h1>

            <Link href="/join">
                Rejoindre une partie
            </Link>

            <Link href="/create">
                Créer une partie
            </Link>
        </div>
    )
}
