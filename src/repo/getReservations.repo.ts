import { child, get, ref } from "firebase/database";
import { useState } from "react";
import { databaseFirebase } from "../utils/firebase";

type ReservationType = {
    email: string;
    nomeEvento: string;
    slotOrario: string;
    ticketQuantity: number;
    idEvento: number;
};

const GetReservations = (userMail: string | null) => {
    const [userReservation, setUserReservation] = useState<ReservationType[]>();
    const dbref = ref(databaseFirebase);
    const reservations: ReservationType[] = [];

    get(child(dbref, "reservations")).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val().email === userMail) {
                reservations.push(childSnapshot.val());
            }
        });

        setUserReservation(reservations);
    });

    return { userReservation };
};

export default GetReservations;
