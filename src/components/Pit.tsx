import { useContext } from "react"
import CardDisplay from "@/components/CardDisplay"
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
            {JSON.stringify(pit?.peek(), null, 2)}
            Pit size: {pit?.getSize() || 0}
        </div>
    )
}

export default Pit;
