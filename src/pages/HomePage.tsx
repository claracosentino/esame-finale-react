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
            <div className="container">
                <div className="grid grid-cols-3 gap-4">
                    {events.map((singleEvent, i) => {
                        return <EventListCard singleEvent={singleEvent} detailPath={`/detail/${singleEvent.id}`} key={i}/>
                    })}
                </div>
            </div>
        </>
    )
}

export default HomePage