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

    console.log(String(isAuthenticated));
    return (
        <>
            <Navbar />
            <section className="profile mt-[88.5px]">
                {isAuthenticated ? (
                    <>
                        <HeroProfile userMail={userMail} />
                        <EventsProfile userMail={userMail} />
                    </>
                ) : (
                    <>
                        <div className="h-[calc(100vh-68.5px)] w-screen flex justify-center items-center">
                            <Link to={"/auth"}>
                                <button className="btn btn-solid">Login</button>
                            </Link>
                        </div>
                    </>
                )}
            </section>
            <Footer />
        </>
    );
};

export default ProfilePage;
