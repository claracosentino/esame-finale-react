import { EventDetailType } from '../../repo/events.types'
import './dettaglio.scss'

type HeroDettaglioProps = {
    eventDetail: EventDetailType
}

const HeroDettaglio = (props: HeroDettaglioProps) => {

    const {coverImage, name, date, tags} = props.eventDetail

    const dateFormatted = new Date(date).toLocaleDateString('it-IT', {'month': 'long', 'day': 'numeric', year: 'numeric',})

    return(
        <>
            <section className="hero h-screen w-screen flex flex-col justify-center items-center " style={{ backgroundImage: `linear-gradient(rgba(29, 29, 27, 0.5), rgba(29, 29, 27, 0.5)), linear-gradient(rgba(206, 75, 197, 0.4), rgba(91, 29, 191, 0.5), rgba(29, 29, 27, 1)), url("${coverImage}")`}}>
                <p className='hero__data'>{dateFormatted}</p>
                <h1 className='w-3/4'>{name}</h1>
            </section>
        
        </>
    )

}

export default HeroDettaglio