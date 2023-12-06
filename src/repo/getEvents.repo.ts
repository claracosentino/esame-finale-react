import { EventDetailType, EventListType } from "./events.types"

const URL = 'https://its-events.davide-mantovani.workers.dev/events'

// Chiamata api per ottenere l'elenco di eventi da mettere nella home
export const getEvents = async (): Promise<EventListType[]> => {
    const res: Response = await fetch(URL)
    try {
        const events = await res.json() as EventListType[]
        return events
    } catch (e) {
        console.error('Errore nella getEvents' + e)
        return []
    }
}

// Chiamata api per ottenere il dettaglio di un determinato evento
// Può ritornare null perchè il caso di catch il valore di ritorno è null
export const getEventDetail = async (id: number): Promise<EventDetailType | null> => {
    const res: Response = await fetch(`${URL}/${id}`)
    try {
        const eventDetail = await res.json() as EventDetailType
        return eventDetail
    } catch (e) {
        console.error('Errore nella getEventDetail' + e)
        return null
    }
}