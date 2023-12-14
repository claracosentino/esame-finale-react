import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";

const CheckIfLogin = () => {
    const [authUser, setAuthUser] = useState<null | User>(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            listen();
        };
    }, []);

    return { authUser };
};

export default CheckIfLogin;
