import EventListCard from "../components/EventListCard"
import { useEvents } from "../hooks/useEvents"

const HomePage = () => {
    const {events, isLoading} = useEvents()

    if(isLoading) {
        return <p>Sta caricando, coglione</p>
    }

    return (
        <>
            <h1>Lista di eventini</h1>
            {events.map((singleEvent, i) => {
                return <EventListCard singleEvent={singleEvent} detailPath={`/detail/${singleEvent.id}`} key={i}/>
            })}
        </>
    )
}

export default HomePage