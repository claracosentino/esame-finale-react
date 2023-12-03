import { Link } from "react-router-dom"
import { EventListType } from "../repo/events.types"

type EventListCardPropsType = {
    singleEvent: EventListType,
    detailPath: string
}

const EventListCard = ({singleEvent, detailPath}: EventListCardPropsType) => {
    
    // destrutturazione delle props
    const {name, date, price, tags, coverImage} = singleEvent

    // formattazione della data > es. lunedi 25/12
    const dateFormatted = new Date(date).toLocaleString('it-IT', {'weekday': 'long', 'month': '2-digit', 'day': '2-digit'});

    // formattazione tag. Trasformati in un'unica stringa e tra un tag e l'altro viene messo ', '
    const tagsFormatted = tags.join(', ')

    // formattazione dell'ora
    const hourFormatted = new Date(date).getHours()
    const minFormatted = new Date(date).getMinutes()

    return(
        <Link to={detailPath}>
            <div className="event-card w-[417px] h-[417px] flex flex-col justify-between" style={{ backgroundImage: "url(https://picsum.photos/200/300.webp)"}}>
                <div className="event-card__top-info flex justify-between">
                    <div className="date">🗓️ {dateFormatted}</div>
                    <div className="price"> da {price}€</div>
                </div>
                <div className="event-card__bottom-info">
                    <div className="name">{name}</div>
                    <div className="flex">
                        <div className="hour">⏰ dalle {hourFormatted}:{minFormatted.toString().length < 2 ?  minFormatted + '0' : minFormatted}</div>
                        <div className="tags">🎵 {tagsFormatted}</div>
                    </div>
                </div>
            </div>
        </Link>
    )

}

export default EventListCard