import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import IsAuthenticated from "../hooks/isAuthenticated";
import "../components/auth/auth.scss";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const SignInPage = () => {
    const isAuthenticated = IsAuthenticated();
    const [succesfulLogout, setSuccesfulLogout] = useState<boolean | null>(null);
    const [hasAccount, setHasAccount] = useState(false);

    const [userMail, setUserMail] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            const userMail = auth.currentUser?.email;
            if (userMail) {
                setUserMail(userMail);
            }
        }
    }, [isAuthenticated]);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                setSuccesfulLogout(true);
                console.log("logout adato a buon fine " + userMail);
            })
            .catch((e) => {
                setSuccesfulLogout(false);
                console.log("Problemi con il logout" + e);
            });
    };

    return (
        <>
            <Navbar />
            <section className="auth container w-screen h-screen flex justify-center items-center">
                <div className="flex flex-col justify-center items-center w-1/2 h-2/3 p-10 rounded-md auth__box">
                    {isAuthenticated ? (
                        <>
                            <h1 className="mb-2">Sei già loggato 🎉</h1>
                            <p className="mb-5">usermail: {userMail}</p>
                            <Link to={"/profile"}>
                                <button className="btn mb-5">Vai al profilo</button>
                            </Link>
                            <button onClick={handleLogout} className="btn mb-5">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            {succesfulLogout == null || succesfulLogout == false ? (
                                <>
                                    {hasAccount ? (
                                        <>
                                            <SignIn />
                                            <button
                                                onClick={() => setHasAccount(false)}
                                                className="btn-underline"
                                            >
                                                Non hai un account?
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <SignUp />

                                            <button
                                                onClick={() => setHasAccount(true)}
                                                className="btn-underline"
                                            >
                                                Hai già un account?
                                            </button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <h1>Logout avvenuto correttamente!</h1>
                                    {hasAccount ? (
                                        <>
                                            <SignIn />
                                            <button
                                                onClick={() => setHasAccount(false)}
                                                className="btn-underline"
                                            >
                                                Non hai un account?
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <SignUp />

                                            <button
                                                onClick={() => setHasAccount(true)}
                                                className="btn-underline"
                                            >
                                                Hai già un account?
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default SignInPage;
