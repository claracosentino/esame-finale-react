import { useEffect, useState } from "react"
import { getEventDetail } from "../repo/getEvents.repo"
import { EventDetailType } from "../repo/events.types"
import { useParams } from "react-router-dom"

export const useEventDetail = () => {

    // creazione di uno state dove andare a caricare l'oggetto di dettaglio dell'evento
    // può essere anche null perchè getEventDetail può ritornare un valore null (come dichiarato in getEvents.repo)
    const [eventDetail, setEventDetail] = useState<EventDetailType | null>()

    // creazione di uno state dove caricare se l'api sta caricando o meno
    // lo metto a true di default perchè al mount carico subito qualcosa quindi è subito in loading
    const [isLoading, setIsLoading] = useState<boolean>(true)

    // acquisisco il parametro di id contenuto nell'url e lo trasformo da string a number
    // imposto 1 come valore di default per idNumber in caso il valore estrapolato nella url non fosse un valore valido
    const { id } = useParams<string>();
    let idNumber = 1
    if(id) {
        idNumber = parseInt(id)
    } else {
        console.error("Il valore di id nell'url non è un valore valido")
    }

    // appena il componente viene creato, gli eventi ricevuti dalla api
    // vengono caricati nello state events
    useEffect(()=>{
        getEventDetail(idNumber).then((eventDetail)=>{
            setEventDetail(eventDetail)
            console.log(eventDetail)
            setIsLoading(false)
        })
    }, [idNumber])

    return {eventDetail, isLoading}
}