import Cards from "../../../../interface/cards"
import { LinkedList } from "../../../../structs/linkedArray";
import CardDisplay from "../card-display/CardDisplay"

interface PitProps {
    pit: LinkedList<Cards> | null,
}

const Pit = ({ pit }: PitProps) => {
    return (
            <div>
                {pit && (
                    <CardDisplay
                        card={pit?.getHead()}
                    />

                )}
                {JSON.stringify(pit?.getHead(), null, 2)}
                Pit size: {pit?.getSize() || 0}
            </div>
    )
}

export default Pit;
