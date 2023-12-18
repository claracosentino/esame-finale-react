import { auth } from "../../utils/firebase";
import "./profile.scss";
import { signOut } from "firebase/auth";
import { useEvents } from "../../hooks/useEvents";
import Loading from "../Loading/Loading";
import EventListCard from "../EventCard/EventListCard";
import GetReservations from "../../repo/getReservations.repo";
import { useState } from "react";

type PropsType = {
    userMail: string | null;
};

const EventsProfile = (props: PropsType) => {
    const { userMail } = props;
    const { userReservation } = GetReservations(userMail);
    const [showReservations, setShowReservations] = useState(false);
    const { events, isLoading } = useEvents(); // tutti gli eventi programmati

    if (isLoading) {
        return <Loading />;
    }

    const handleLogOut = () => {
        signOut(auth)
            .then(() => {
                console.log("sign out succesful");
                window.location.replace("/auth");
            })
            .catch((e) => {
                console.log("problemino signout " + e);
            });
    };

    return (
        <>
            <section className="eventi-profile mt-20">
                <div className="container">
                    {showReservations ? (
                        <>
                            <div className="flex justify-center">
                                <button
                                    className="btn btn-solid mr-5"
                                    onClick={() => setShowReservations(false)}
                                >
                                    Nascondi eventi
                                </button>
                                <button className="btn btn-solid" onClick={handleLogOut}>
                                    Logout
                                </button>
                            </div>

                            <p className="vederti-scatenare mt-20 mb-10">
                                Non vediamo l'ora di vederti scatenare 🕺 a questi eventi!
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {events.map((singleAvailableEvent, i) => {
                                    return userReservation?.map((singleReservationEvent) => {
                                        if (
                                            singleAvailableEvent.id ==
                                            singleReservationEvent.idEvento
                                        ) {
                                            return (
                                                <>
                                                    <div key={i}>
                                                        <EventListCard
                                                            singleEvent={singleAvailableEvent}
                                                            detailPath={`/detail/${singleAvailableEvent.id}`}
                                                        />

                                                        <p className="text-center mt-2 mb-5">
                                                            x{singleReservationEvent.ticketQuantity}
                                                            pax || h.
                                                            {singleReservationEvent.slotOrario}
                                                        </p>
                                                    </div>
                                                </>
                                            );
                                        } else {
                                            return null;
                                        }
                                    });
                                })}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-center">
                                <button
                                    className="btn btn-solid mr-5"
                                    onClick={() => {
                                        setShowReservations(true);
                                        GetReservations(userMail);
                                    }}
                                >
                                    I tuoi eventi
                                </button>
                                <button className="btn btn-solid" onClick={handleLogOut}>
                                    Logout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default EventsProfile;
