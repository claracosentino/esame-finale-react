import { EventDetailType } from "../../repo/events.types";
import dayjs from "dayjs";
import "./dettaglio.scss";

type HeroDettaglioProps = {
    eventDetail: EventDetailType;
};

const Prenotazione = (props: HeroDettaglioProps) => {
    const { date } = props.eventDetail;

    // ora di inzio evento formattata in HH:MM
    const hourStartEventFormatted = dayjs(date).format("HH:mm");

    // array dove vado a inserire (tramite ciclo for) tutti gli slot di 15 min
    const hourSlots = [];
    for (let i = 1; i < 7; i++) {
        // prendo la data di inizio evento e ci aggiungo 15*nCiclo minuti
        const hourIncremented = dayjs(date).add(15 * i, "minute");
        // formatto in HH:mm
        const hourIncrementedFormatted = hourIncremented.format("HH:mm");
        // pusho l'ora formattata nell'array hourSlots
        hourSlots.push(hourIncrementedFormatted);
    }

    console.log(hourSlots);

    return (
        <>
            <section className="prenotazione">
                <div className="container">
                    <p>L'evento inizia alle ore {hourStartEventFormatted}</p>
                    {hourSlots.map((hour, i) => {
                        return (
                            <button className="btn btn-solid" key={i}>
                                {hour}
                            </button>
                        );
                    })}
                </div>
            </section>
        </>
    );
};

export default Prenotazione;
