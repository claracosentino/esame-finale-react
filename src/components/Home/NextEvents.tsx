import { EventListType } from "../../repo/events.types";
import EventListCard from "../EventCard/EventListCard";
import "./home.scss";
import "../global.scss";
import { Link } from "react-router-dom";

type NextEventsProps = {
    events: EventListType[];
};

const NextEvents = (props: NextEventsProps) => {
    const { events } = props;

    return (
        <div className="container">
            <div className="flex justify-between">
                <h2>
                    Scopri gli <span>eventi</span>
                </h2>
                <Link to="/events">
                    <button className="btn-underline">
                        Vedi tutti <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {events.map((singleEvent, i) => {
                    if (i < 3) {
                        return (
                            <EventListCard
                                singleEvent={singleEvent}
                                detailPath={`/detail/${singleEvent.id}`}
                                key={i}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default NextEvents;
