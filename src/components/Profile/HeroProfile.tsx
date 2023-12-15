import "./profile.scss";

type PropsType = {
    userMail: string | null;
};

const HeroProfile = (props: PropsType) => {
    const { userMail } = props;

    return (
        <>
            <section className="hero-profile">
                <div className="hero-profile__box h-[20vh]">
                    <div className="h-full w-full flex items-end justify-center">
                        <div className="circle rounded-full"></div>
                    </div>
                </div>
                <h1>
                    Bentornato <br /> <span> {userMail} </span> 🎉
                </h1>
            </section>
        </>
    );
};

export default HeroProfile;
