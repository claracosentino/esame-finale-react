import { Link } from "react-router-dom"
import { EventListType } from "../repo/events.types"
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();


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
            <div className="event-card h-[417px] flex flex-col justify-between" style={{ backgroundImage: `linear-gradient(rgba(206, 75, 197, 0.4), rgba(91, 29, 191, 0.5), rgba(0, 0, 0, 0.5)), url(${coverImage})`}}>
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