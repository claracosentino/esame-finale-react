import DescriptionEvento from "../components/DettaglioEvento/DescriptionEvento";
import HeroDettaglio from "../components/DettaglioEvento/HeroDettaglio";
import Prenotazione from "../components/DettaglioEvento/Prenotazione";
import Footer from "../components/Footer/Footer";
import Loading from "../components/Loading/Loading";
import Navbar from "../components/Navbar/Navbar";
import { useEventDetail } from "../hooks/useEventDetail";

const DetailPage = () => {
    const { eventDetail, isLoading } = useEventDetail();

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Navbar />
            {/* CAPIRE SE QUESTA COSA SIA GIUSTA */}
            {eventDetail ? (
                <>
                    <HeroDettaglio eventDetail={eventDetail} />
                    <DescriptionEvento eventDetail={eventDetail} />
                    <Prenotazione eventDetail={eventDetail} />
                    <Footer />
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default DetailPage;
