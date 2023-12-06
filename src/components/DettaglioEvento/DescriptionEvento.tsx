import { EventDetailType } from '../../repo/events.types'
import './dettaglio.scss'

type HeroDettaglioProps = {
    eventDetail: EventDetailType
}

const DescriptionEvento = (props: HeroDettaglioProps) => {

    const {coverImage, name, date, tags} = props.eventDetail

    return(
        <>
            <section className='descrizione-evento'>
                <img src="certificate-aperitivo.png" alt="" />
            </section>
            {/* "dresscode": string,
    "price": number,
    "includedDrinks": string[],
    "tags": string[],
    "isAperitivoIncluded": boolean
    descrizione
    */}
        </>
    )

}

export default DescriptionEvento