import { Link } from "react-router-dom";
import CheckIfLogin from "../hooks/checkIfLogin";
import { getAuth, signOut } from "firebase/auth";
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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userMail, setUserMail] = useState<string | null>(null);
    const [userReservation, setUserReservation] = useState<ReservationType[]>();
    const [vediRes, setVediRes] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            const userMail = auth.currentUser?.email;
            if (userMail) {
                setUserMail(userMail);
            }
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const auth = getAuth();
        auth.onAuthStateChanged((user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });
    }, []);

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
            setVediRes(true);
        });
    };

    const handleSignOut = () => {
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
            {isAuthenticated ? (
                <>
                    <h1>Bentornato {userMail}</h1>
                    <p>Non vediamo l'ora di vederti scatenare a questi eventi! </p>
                    <button onClick={getReservation}>vedi</button>
                    {vediRes
                        ? userReservation?.map((el, i) => {
                              return (
                                  <>
                                      <div key={i}>
                                          <p key={i}>{el.nomeEvento}</p>
                                      </div>
                                  </>
                              );
                          })
                        : ""}
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
