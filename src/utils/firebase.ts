import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { collection, getDocs } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAb7NvFOo4dpju7HBV1iO17eMAEob8xGEQ",
  authDomain: "prenotazione-discoteca.firebaseapp.com",
  projectId: "prenotazione-discoteca",
  storageBucket: "prenotazione-discoteca.appspot.com",
  messagingSenderId: "162874683858",
  appId: "1:162874683858:web:bbeb0c160489da9eb9580b",
  measurementId: "G-0X7RQK0F48",
  databaseURL: 'https://prenotazione-discoteca-default-rtdb.europe-west1.firebasedatabase.app/'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const databaseFirebase = getDatabase(app);

export function writeDataReservation(id: number, nome:string, cognome:string, email:string, nomeEvento:string, slotOrario:string) {
  set(ref(databaseFirebase, "reservations/"), {
    nome,
    cognome,
    email,
    nomeEvento,
    slotOrario,
  });
}