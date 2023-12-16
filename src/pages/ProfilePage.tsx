import { Link } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useEffect, useState } from "react";
import IsAuthenticated from "../hooks/isAuthenticated";
import Navbar from "../components/Navbar/Navbar";
import HeroProfile from "../components/Profile/HeroProfile";
import EventsProfile from "../components/Profile/EventsProfile";
import Footer from "../components/Footer/Footer";

const ProfilePage = () => {
    const [userMail, setUserMail] = useState<string | null>(null);

    const isAuthenticated = IsAuthenticated();

    useEffect(() => {
        if (isAuthenticated) {
            const userMail = auth.currentUser?.email;
            if (userMail) {
                setUserMail(userMail);
            }
        }
    }, [isAuthenticated]);

    return (
        <>
            <Navbar />
            <section className="profile mt-[68.5px]">
                {isAuthenticated ? (
                    <>
                        <HeroProfile userMail={userMail} />
                        <EventsProfile userMail={userMail} />
                    </>
                ) : (
                    <>{window.location.replace("/auth")}</>
                )}
            </section>
            <Footer />
        </>
    );
};

export default ProfilePage;
