import "./home.scss";

const HeroHome = () => {
    // Gestione dell'opacità dell'hero
    const handleScroll = () => {
        const fluidImg = document.querySelector(".fluid-img");
        const scrollPosition = window.scrollY;
        // Quando scrollY è >= 500 allora opacità 0 sennò opacità 1
        fluidImg.style.opacity = scrollPosition >= 500 ? 0 : 1;
    };

    window.addEventListener("scroll", handleScroll);

    return (
        <>
            <section className="hero w-screen">
                <div className="fluid-img fixed z-[-1] w-screen h-screen"></div>

                <div className="container h-screen flex justify-center items-center">
                    <div className="square w-3/4 md:w-2/4 lg:w-1/4 aspect-square flex items-end flex-wrap p-8">
                        <h1>FUSION</h1>
                        <p className="payoff">Ritmo, Luce, Fusion.</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeroHome;
