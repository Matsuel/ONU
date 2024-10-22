import Cards from "../../../../interface/cards"
import { Stack } from "../../../../structs/stack"
import CardDisplay from "../card-display/CardDisplay"

interface PitProps {
    pit: Stack<Cards> | null,
}

const Pit = ({ pit }: PitProps) => {
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
