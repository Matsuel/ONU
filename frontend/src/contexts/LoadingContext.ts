import { LoadingContextType } from "@/types";
import { createContext } from "react";

const LoadingContext = createContext({} as LoadingContextType)

export default LoadingContext