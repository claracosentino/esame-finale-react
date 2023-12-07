import { EventDetailType } from '../../repo/events.types'
import './dettaglio.scss'

type HeroDettaglioProps = {
    eventDetail: EventDetailType
}

const HeroDettaglio = (props: HeroDettaglioProps) => {

    const {coverImage, name, date, tags, isAperitivoIncluded} = props.eventDetail
    const tagFormatted = tags.join(', ')
    const dateFormatted = new Date(date).toLocaleDateString('it-IT', {'month': 'long', 'day': 'numeric', year: 'numeric',})

    return(
        <>
            <section className="hero w-screen flex flex-col justify-center items-center h-screen" style={{ backgroundImage: `linear-gradient(rgba(29, 29, 27, 0.5), rgba(29, 29, 27, 0.5)), linear-gradient(rgba(206, 75, 197, 0.4), rgba(91, 29, 191, 0.5), rgba(29, 29, 27, 1)), url("${coverImage}")`}}>
                <div className="row h-2/6"></div>
                <div className="row h-2/6 flex justify-center no-wrap flex-col items-center">
                    <p className='hero__data'>{dateFormatted} || {tagFormatted}</p>
                    <h1 className='w-3/4'>{name}</h1>
                </div>
                <div className="row h-2/6">
                    {isAperitivoIncluded ? 
                        (
                            <div className="flex w-full items-center">
                                <div className="certificate-aperitivo flex justify-center items-center flex-wrap">
                                    <p className="drink">Aperitivo</p>
                                    <p className="incluso">INCLUSO</p>
                                </div>
                            </div>
                        ) : ''}
                </div>


            </section>
        
        </>
    )

}

export default HeroDettaglio