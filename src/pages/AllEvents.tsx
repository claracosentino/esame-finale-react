import EventListCard from "../components/EventListCard";
import Footer from "../components/Footer";
import Faq from "../components/Home/Faq";
import Navbar from "../components/Navbar";
import { useEvents } from "../hooks/useEvents";

const AllEvents = () => {
    /* Rifaccio la chiamata e non mi prendo gli eventi come props perchè sennò se vado direttamente sulla pagina events non trovo nulla */
    const { events, isLoading } = useEvents();

    if (isLoading) {
        return <p>Sta caricandoooo</p>;
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <h2>
                    Tutti gli <span>eventi</span>
                </h2>
                <div className="grid grid-cols-3 gap-4">
                    {events.map((singleEvent, i) => {
                        return (
                            <EventListCard
                                singleEvent={singleEvent}
                                detailPath={`/detail/${singleEvent.id}`}
                                key={i}
                            />
                        );
                    })}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllEvents;
