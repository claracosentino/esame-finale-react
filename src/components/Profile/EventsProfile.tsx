import { child, get, ref } from "firebase/database";
import { auth, databaseFirebase } from "../../utils/firebase";
import { useState } from "react";
import "./profile.scss";
import { signOut } from "firebase/auth";
import { useEvents } from "../../hooks/useEvents";
import Loading from "../Loading/Loading";
import EventListCard from "../EventCard/EventListCard";

type ReservationType = {
    email: string;
    nomeEvento: string;
    slotOrario: string;
    ticketQuantity: number;
    idEvent: number;
};

type PropsType = {
    userMail: string | null;
};

const EventsProfile = (props: PropsType) => {
    const [userReservation, setUserReservation] = useState<ReservationType[]>();
    const [showReservations, setShowReservations] = useState(false);
    const { userMail } = props;
    const { events, isLoading } = useEvents(); // tutti gli eventi programmati
    if (isLoading) {
        return <Loading />;
    }

    const getReservation = () => {
        const dbref = ref(databaseFirebase);
        const reservations: ReservationType[] = [];

        get(child(dbref, "reservations")).then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                if (childSnapshot.val().email === userMail) {
                    reservations.push(childSnapshot.val());
                }
            });

            setUserReservation(reservations);
            setShowReservations(true);
        });
    };

    const handleLogOut = () => {
        signOut(auth)
            .then(() => {
                console.log("sign out succesful");
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

                            <p>Non vediamo l'ora di vederti scatenare a questi eventi! </p>

                            {events.map((singleAvailableEvent, i) => {
                                userReservation?.map((singleReservationEvent, i) => {
                                    if (singleAvailableEvent.id == singleAvailableEvent.id) {
                                        return (
                                            <>
                                                <EventListCard
                                                    singleEvent={singleAvailableEvent}
                                                    detailPath={`/detail/${singleAvailableEvent.id}`}
                                                    key={i}
                                                />
                                            </>
                                        );
                                    }
                                });
                            })}
                        </>
                    ) : (
                        <>
                            <div className="flex justify-center">
                                <button className="btn btn-solid mr-5" onClick={getReservation}>
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
