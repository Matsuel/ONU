import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'
import GameContext from '@/contexts/GameContext';

const useUuid = () => {
    const { setUuid } = useContext(GameContext)
    const router = useRouter();

    useEffect(() => {
        const playerUuid = sessionStorage.getItem("uuid");
        if (playerUuid) {
            setUuid(playerUuid);
        } else {
            router.push("/");
        }
    }, [router, setUuid]);
}

export default useUuid