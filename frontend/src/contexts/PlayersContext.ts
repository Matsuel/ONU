import { PlayersContextType } from "@/types"
import { createContext } from "react"

const PlayersContext = createContext({} as PlayersContextType)

export default PlayersContext