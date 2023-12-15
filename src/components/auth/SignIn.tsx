import { useState } from "react";
import { auth } from "../../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./auth.scss";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                console.log("login andato a buon fine");
                window.location.href = "/";
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div className="sign-in-container">
            <form onSubmit={handleSignIn} className="flex flex-wrap justify-center">
                <h1 className="mb-5">Log in</h1>
                <input
                    type="email"
                    placeholder="Inserisci l'email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-3 p-3"
                />
                <input
                    type="password"
                    placeholder="Inserisci la password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-5 p-3"
                />
                <button type="submit" className="btn mb-5">
                    Login
                </button>
            </form>
        </div>
    );
};

export default SignIn;
