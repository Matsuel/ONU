import { Cards } from "@/types";
import { cardToImage } from "@/utils/cardsFunction";
import Image from "next/image";

interface CardDisplayProps {
    card: Cards | null,
}

const CardDisplay = ({
    card
}: CardDisplayProps) => {


    return (
        <Image
            src={`/Cards/${cardToImage(card)}`}
            alt="special card"
            width={100}
            height={100}
        />
    )
}

export default CardDisplay;
