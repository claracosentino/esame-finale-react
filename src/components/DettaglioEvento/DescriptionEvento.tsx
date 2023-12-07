import { EventDetailType } from "../../repo/events.types";
import "./dettaglio.scss";

type HeroDettaglioProps = {
    eventDetail: EventDetailType;
};

const DescriptionEvento = (props: HeroDettaglioProps) => {
    const { tags, description, price, includedDrinks, dresscode, includedDishes } =
        props.eventDetail;
    const includedDrinksFormatted = includedDrinks.join(", ");

    return (
        <>
            <section className="descrizione-evento my-10">
                <div className="container">
                    <div className="flex">
                        <div className="descrizione-evento__testo-grande w-3/6 my-10">
                            {/* La descrizione è un array di frasi: con il map, ogni frase diventa un p e così ogni paragrafo va a capo */}
                            {description.long.map((frase, i) => {
                                if (i < 1) {
                                    return (
                                        <p key={i} className="pb-5">
                                            {frase}
                                        </p>
                                    );
                                }
                            })}
                        </div>
                        <div className="descrizione-evento__testo-piccolo w-3/6 my-10 ml-10">
                            {/* La descrizione è un array di frasi: con il map, ogni frase diventa un p e così ogni paragrafo va a capo */}
                            {description.long.map((frase, i) => {
                                if (i >= 1) {
                                    return (
                                        <p key={i} className="pb-3">
                                            {frase}
                                        </p>
                                    );
                                }
                            })}
                        </div>
                    </div>
                    <div className="flex justify-between my-10">
                        <div className="descrizione-evento__box flex justify-center items-center p-5 w-1/4 h-100 price noise">
                            <div>
                                <p className="emoji">🤑</p>
                                <p className="dataTitle">PRICE:</p>
                                <p className="data">{price}€</p>
                            </div>
                        </div>
                        <div className="descrizione-evento__box flex justify-center items-center p-5 w-1/4 h-100 dresscode noise">
                            <div>
                                <p className="emoji">👗</p>
                                <p className="dataTitle">DRESSCODE:</p>
                                <p className="data">{dresscode}</p>
                            </div>
                        </div>
                        <div className="descrizione-evento__box flex justify-center items-center p-5 w-1/4 h-100 included-drinks noise">
                            <div>
                                <p className="emoji">🍹</p>
                                <p className="dataTitle">INCLUDED DRINKS:</p>
                                <p className="data">{includedDrinksFormatted}</p>
                            </div>
                        </div>
                    </div>
                    {includedDishes ? (
                        <div className="flex">
                            <div className="descrizione-evento__testo-grande w-3/6 my-10">
                                Fame? Abbiamo anche pensato al cibo 🍕 Nel prezzo sono inclusi tutti
                                questi deliziosi piatti per insaporire la serata!
                            </div>
                            <div className="descrizione-evento__testo-piccolo w-3/6 my-10 ml-10">
                                {/* La descrizione è un array di frasi: con il map, ogni frase diventa un p e così ogni paragrafo va a capo */}
                                {includedDishes.map((dish, i) => {
                                    return (
                                        <>
                                            <p key={i} className="pb-3">
                                                Piatto: {dish.name}
                                            </p>
                                            <p key={i} className="pb-3">
                                                Descrizione: {dish.description}
                                            </p>

                                            {dish.allergens.map((ingrediente, i) => {
                                                return (
                                                    <>
                                                        <p key={i} className="pb-3">
                                                            Allergeni: {ingrediente}
                                                        </p>
                                                    </>
                                                );
                                            })}

                                            <hr />
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </section>
            {/* "dresscode": string,
    "price": number,
    "includedDrinks": string[],
    "tags": string[],
    "isAperitivoIncluded": boolean
    descrizione
    */}
        </>
    );
};

export default DescriptionEvento;
