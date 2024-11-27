import { useContext } from "react"
import CardDisplay from "@/components/card/CardDisplay"
import PitContext from "@/contexts/PitContext"

const Pit = () => {
    const { pit } = useContext(PitContext)

    return (
        <div>
            {pit && (
                <CardDisplay
                    card={pit?.peek()}
                />

            )}
        </div>
    )
}

export default Pit;
