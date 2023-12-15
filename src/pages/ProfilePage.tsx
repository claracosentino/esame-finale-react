import { Link } from "react-router-dom";
import CheckIfLogin from "../hooks/checkIfLogin";
import { signOut } from "firebase/auth";
import { auth, databaseFirebase } from "../utils/firebase";
import { useEffect, useState } from "react";
import { child, get, ref } from "firebase/database";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { counterActions } from "../redux/counter.slice";

import { getAuth } from "firebase/auth";

type ReservationType = {
    cognome: string;
    email: string;
    nome: string;
    nomeEvento: string;
    slotOrario: string;
};

const ProfilePage = () => {
    const count = useAppSelector((state) => state.counter.email);
    const dispatch = useAppDispatch();

    const auth = getAuth();
    const user = auth.currentUser;

    if (user !== null) {
        const email = user.email;
        console.log("oleeee");
        console.log(email);
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("sign out succesful");
            })
            .catch((e) => {
                console.log("problemino signout " + e);
            });
    };

    /* useEffect(() => {
        const dbref = ref(databaseFirebase);

        get(child(dbref, "reservations")).then((snapshot) => {
            const userReservation = [];
            snapshot.forEach((childSnapshot) => {
                if (childSnapshot.val().email === "simo.motta@gmail.com") {
                    userReservation.push(childSnapshot.val());
                }
            });
            console.log(userReservation);
        });
    }, []); */

    return (
        <>
            <p>count is {count}</p>
            {user.authUser ? (
                <>
                    <h1>Bentornato {user.authUser.email}</h1>
                    <p>Non vediamo l'ora di vederti scatenare a questi eventi! </p>
                    <button onClick={() => dispatch(counterActions.getEmail())}>
                        Vedi i tuoi appuntamenti coglione
                    </button>
                    {/* {userReservation.map((el, i) => {
                        <p key={i}>
                            <>{el}</>
                        </p>;
                    })} */}
                    <button onClick={handleSignOut}>Sign out</button>
                </>
            ) : (
                <>
                    <p>Effettua il login per vedere il tuo profilo</p>
                    <Link to="/auth">
                        <button>Vai al login</button>
                    </Link>
                </>
            )}
        </>
    );
};

export default ProfilePage;
