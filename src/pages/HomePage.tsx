import { useEvents } from "../hooks/useEvents"

const HomePage = () => {
    const {events, isLoading} = useEvents()

    if(isLoading) {
        return <p>Sta caricando, coglione</p>
    }

    return (
        <>
            <h1>Lista di eventini</h1>
            {events.map((evento, i) => {
                return (
                    <p key={i}>Il nome dell'evento è {evento.name}</p>
                )
            })}
        </>
    )
}

export default HomePage