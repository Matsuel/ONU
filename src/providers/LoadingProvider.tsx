import { ProviderProps } from '@/types';
import { createContext, useState } from 'react'

interface LoadingContextType {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingContext = createContext({} as LoadingContextType)

const LoadingProvider = ({ children }: ProviderProps) => {

    const [loading, setLoading] = useState<boolean>(true);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingProvider