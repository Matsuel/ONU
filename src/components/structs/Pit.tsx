import { useContext } from "react"
import CardDisplay from "@/components/card/CardDisplay"
import { PitContext } from "@/providers/PitProvider"

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
