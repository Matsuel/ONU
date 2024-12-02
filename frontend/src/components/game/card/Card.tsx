import { useContext, useEffect, useState } from "react"
import { isCardPlayable, playCardOnClick } from "../../../utils/cardsFunction"
import CardDisplay from "./CardDisplay"
import CardBack from "./CardBack"
import ColorModal from "./ColorModal"
import { Cards, Player } from "@/types"
import PitContext from "@/contexts/PitContext"
import GameContext from "@/contexts/GameContext"
import PlayersContext from "@/contexts/PlayersContext"

interface CardProps {
    card: Cards
    cardIndex: number
    player: Player
    uuid: string
    sortedPlayers: Player[]
}

const Card = ({
    card,
    cardIndex,
    player,
    uuid,
    sortedPlayers
}: CardProps) => {
    const { pit } = useContext(PitContext)
    const { uuid: playerUuid } = useContext(GameContext)
    const { playerTurn, players } = useContext(PlayersContext)

    const [isSpecialClicked, setIsSpecialClicked] = useState(false)

    useEffect(() => {
        setIsSpecialClicked(false)
    }, [playerTurn, pit])

    const notAllowed = "opacity-30 pointer-events-none border-4 border-transparent"
    const allowed = "opactiy-100 border-4 border-transparent hover:border-white rounded-xl transition-all"
    const isPlayable = isCardPlayable(card, pit.peek());
    const isPlayerTurn = players[playerTurn].uuid === player.uuid;
    const isCurrentPlayer = sortedPlayers[0].uuid === player.uuid;
    let canClientClickOnCard = "";

    if (isPlayerTurn) {
        if (isCurrentPlayer) {
            canClientClickOnCard = isPlayable ? allowed : notAllowed;
        } else {
            canClientClickOnCard = allowed + " pointer-events-none";
        }
    } else {
        canClientClickOnCard = notAllowed;
    }

    return (
        <button
            key={cardIndex}
            className={canClientClickOnCard}
            onClick={() => {
                if (card.special === "changecolor" || card.special === "plus4") {
                    setIsSpecialClicked(true)
                    return
                }
                setIsSpecialClicked(false)
                playCardOnClick(
                    cardIndex,
                    card,
                    player,
                    uuid,
                )
            }}
        >
            {isSpecialClicked ? <ColorModal setIsSpecialClicked={setIsSpecialClicked} uuid={uuid} cardIndex={cardIndex} card={card} player={player} /> : null}
            {player.uuid === playerUuid ? <CardDisplay card={card} /> : <CardBack />}
        </button >
    )
}

export default Card
