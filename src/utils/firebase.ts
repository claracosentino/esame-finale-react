import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAb7NvFOo4dpju7HBV1iO17eMAEob8xGEQ",
    authDomain: "prenotazione-discoteca.firebaseapp.com",
    projectId: "prenotazione-discoteca",
    storageBucket: "prenotazione-discoteca.appspot.com",
    messagingSenderId: "162874683858",
    appId: "1:162874683858:web:bbeb0c160489da9eb9580b",
    measurementId: "G-0X7RQK0F48",
    databaseURL: "https://prenotazione-discoteca-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const databaseFirebase = getDatabase(app);

// funzione per scrivere le informazioni della prenotazione sul db
export function writeDataReservation(
    email: string,
    nomeEvento: string,
    slotOrario: string,
    ticketQuantity: number,
    idEvento: number
) {
    push(ref(databaseFirebase, "reservations/"), {
        email,
        nomeEvento,
        slotOrario,
        ticketQuantity,
        idEvento,
    });
}
