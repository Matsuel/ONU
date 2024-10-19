import Cards from "../../../../interface/cards"
import Player from "../../../../interface/player";

interface CardDisplayProps {
    card: Cards | undefined,
}

const CardDisplay = ({ card }: CardDisplayProps) => {
    const playCard = () => {
        console.log(`card played ${JSON.stringify(card)}`);
    }

    return (
        <button 
            className="opacity-40 hover:opacity-100 transition-all"
            onClick={playCard}
        >
            {card && card.special ? (
                <div>
                    {card.color ? (
                        <img 
                            src={`/Cards/${card.special}${card.color}.png`} 
                            alt="special card"
                            className="w-24"
                        />
                    ): (
                        <img 
                            src={`/Cards/${card.special}.png`} 
                            alt="special card"
                            className="w-24"
                        />
                    )}
                </div>
            ) : (
                <div>
                    {card && (
                        <img 
                            src={`/Cards/${card.number}${card.color}.png`} 
                            alt="base card"
                            className="w-24"
                        />
                    )}
                </div>
            )}
        </button>
    )
}

export default CardDisplay;
