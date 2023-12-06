import { useEffect, useState } from "react"
import { getEvents } from "../repo/getEvents.repo"
import { EventListType } from "../repo/events.types"

export const useEvents = () => {

    // creazione di uno state dove andare a caricare gli eventi da listare nella home
    const [events, setEvents] = useState<EventListType[]>([])
    // creazione di uno state dove caricare se l'api sta caricando o meno
    // lo metto a true di default perchè al mount carico subito qualcosa quindi è subito in loading
    const [isLoading, setIsLoading] = useState<boolean>(true)

    // appena il componente viene creato, gli eventi ricevuti dalla api
    // vengono caricati nello state events
    useEffect(()=>{
        getEvents().then((events)=>{
            setEvents(events)
            setIsLoading(false)
        })
    }, [])

    return {events, isLoading}
}