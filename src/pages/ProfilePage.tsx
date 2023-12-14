import { Link } from "react-router-dom";
import CheckIfLogin from "../hooks/checkIfLogin";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

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

    return (
        <>
            {user.authUser ? (
                <>
                    <h1>Bentornato {user.authUser.email}</h1>
                    <p>Non vediamo l'ora di vederti scatenare a questi eventi! </p>
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
