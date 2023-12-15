import { Link } from "react-router-dom";
import CheckIfLogin from "../hooks/checkIfLogin";
import { signOut } from "firebase/auth";
import { auth, databaseFirebase } from "../utils/firebase";
import { useEffect, useState } from "react";
import { child, get, ref } from "firebase/database";

type ReservationType = {
    cognome: string;
    email: string;
    nome: string;
    nomeEvento: string;
    slotOrario: string;
};

const ProfilePage = () => {
    const user = CheckIfLogin();

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("sign out succesful");
            })
            .catch((e) => {
                console.log("problemino signout " + e);
            });
    };

    useEffect(() => {
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
    }, []);

    return (
        <>
            {user.authUser ? (
                <>
                    <h1>Bentornato {user.authUser.email}</h1>
                    <p>Non vediamo l'ora di vederti scatenare a questi eventi! </p>
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
