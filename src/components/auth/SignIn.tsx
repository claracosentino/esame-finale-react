import { useState } from "react";
import { auth } from "../../utils/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((e) => {
                console.log(e);
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
        <div className="sign-in-container">
            <form onSubmit={handleSignIn}>
                <h1>Log in</h1>
                <input
                    type="email"
                    placeholder="enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>

            <button onClick={handleSignOut}>Sign out</button>
        </div>
    );
};

export default SignIn;
