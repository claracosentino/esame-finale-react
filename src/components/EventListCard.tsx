import { Link } from "react-router-dom"
import { EventListType } from "../repo/events.types"

type EventListCardPropsType = {
    singleEvent: EventListType,
    detailPath: string
}

const EventListCard = ({singleEvent, detailPath}: EventListCardPropsType) => {
    
    // destrutturazione delle props
    const {name} = singleEvent

    return(
        <>
            <div>
                <p>{name}</p>
                <Link to={detailPath}>Vai ai dettagli</Link>
            </div>
        </>
    )

}

export default EventListCard