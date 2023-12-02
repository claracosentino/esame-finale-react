import { useEventDetail } from "../hooks/useEventDetail"

const DetailPage = () => {

    const {eventDetail, isLoading} = useEventDetail()

    return (
        <>
            <p>
                Pagina di dettaglio
            </p>
        </>
    )
}

export default DetailPage