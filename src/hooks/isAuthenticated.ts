import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

const IsAuthenticated = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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

    return isAuthenticated;
};

export default IsAuthenticated;
