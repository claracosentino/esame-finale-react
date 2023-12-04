import DescriptionHome from "../components/Home/DescriptionHome"
import HeroHome from "../components/Home/HeroHome"
import { useEvents } from "../hooks/useEvents"
import { register } from 'swiper/element';
import NextEvents from "../components/Home/NextEvents";
import Faq from "../components/Home/Faq";

// Register Swiper components
register();


const HomePage = () => {
    const {events, isLoading} = useEvents()

    if(isLoading) {
        return <p>Sta caricandoooo</p>
    }

    return (
        <>
            <HeroHome/>
            <DescriptionHome/>
            <NextEvents events={events}/>
            <Faq/>
        </>
    )
}

export default HomePage