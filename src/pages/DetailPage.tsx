import DescriptionEvento from "../components/DettaglioEvento/DescriptionEvento"
import HeroDettaglio from "../components/DettaglioEvento/HeroDettaglio"
import Prenotazione from "../components/DettaglioEvento/Prenotazione"
import Navbar from "../components/Navbar"
import { useEventDetail } from "../hooks/useEventDetail"

const DetailPage = () => {

    const {eventDetail, isLoading} = useEventDetail()

    return (
        <>
            <Navbar/>
            {/* CAPIRE SE QUESTA COSA SIA GIUSTA */}
            {eventDetail ? (
                <>
                    <HeroDettaglio eventDetail={eventDetail}/>
                    <DescriptionEvento eventDetail={eventDetail}/>
                    <Prenotazione eventDetail={eventDetail}/>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}

export default DetailPage