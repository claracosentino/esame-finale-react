import DescriptionHome from "../components/DescriptionHome"
import EventListCard from "../components/EventListCard"
import HeroHome from "../components/HeroHome"
import { useEvents } from "../hooks/useEvents"

const HomePage = () => {
    const {events, isLoading} = useEvents()

    if(isLoading) {
        return <p>Sta caricandoooo</p>
    }

    return (
        <>
            <HeroHome/>
            <DescriptionHome/>
            <h1>Lista di eventini</h1>
            {events.map((singleEvent, i) => {
                return <EventListCard singleEvent={singleEvent} detailPath={`/detail/${singleEvent.id}`} key={i}/>
            })}
        </>
    )
}

export default HomePage