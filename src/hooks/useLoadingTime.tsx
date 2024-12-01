import { useEffect, useState } from 'react'


const useLoadingTime = () => {

    const [loadingTime, setLoadingTime] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingTime(loadingTime => loadingTime + 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return { loadingTime }
}

export default useLoadingTime