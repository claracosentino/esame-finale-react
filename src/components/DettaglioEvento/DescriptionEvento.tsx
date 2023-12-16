import { EventDetailType, DishType } from "../../repo/events.types";
import "./dettaglio.scss";

type HeroDettaglioProps = {
    eventDetail: EventDetailType;
};

const DescriptionEvento = (props: HeroDettaglioProps) => {
    const { description, price, includedDrinks, dresscode, includedDishes } = props.eventDetail;
    const includedDrinksFormatted = includedDrinks.join(", ");

    return (
        <>
            <section className="descrizione-evento my-20">
                <div className="container">
                    <div className="sm:flex my-10">
                        <div className="descrizione-evento__testo-grande w-full sm:w-3/6">
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
                        <div className="descrizione-evento__testo-piccolo w-full sm:w-3/6 sm:ml-10">
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
                    <div className="grid md:grid-cols-3 gap-4 flex-wrap my-10">
                        <div className="descrizione-evento__box flex justify-center items-center mb-5 mt-10 md:mt-0 p-5 w-full h-100 price noise">
                            <div>
                                <p className="emoji">🤑</p>
                                <p className="dataTitle">PRICE:</p>
                                <p className="data">{price}€</p>
                            </div>
                        </div>
                        <div className="descrizione-evento__box flex justify-center items-center mb-5 p-5 w-full h-100 dresscode noise">
                            <div>
                                <p className="emoji">👗</p>
                                <p className="dataTitle">DRESSCODE:</p>
                                <p className="data">{dresscode}</p>
                            </div>
                        </div>
                        <div className="descrizione-evento__box flex justify-center items-center mb-5 p-5 w-full h-100 included-drinks noise">
                            <div>
                                <p className="emoji">🍹</p>
                                <p className="dataTitle">INCLUDED DRINKS:</p>
                                <p className="data">{includedDrinksFormatted}</p>
                            </div>
                        </div>
                    </div>
                    {includedDishes ? (
                        <div className="sm:flex my-10">
                            <div className="descrizione-evento__testo-grande w-full sm:w-3/6 pb-5">
                                Fame? Abbiamo anche pensato al cibo 🍕 Nel prezzo sono inclusi tutti
                                questi deliziosi piatti per insaporire la serata!
                            </div>
                            <div className="descrizione-evento__testo-piccolo w-full sm:w-3/6 sm:ml-10">
                                {/* La descrizione è un array di frasi: con il map, ogni frase diventa un p e così ogni paragrafo va a capo */}
                                {includedDishes.map((dish: DishType, i: number) => {
                                    return (
                                        <>
                                            <p key={i} className="pb-3">
                                                Piatto: {dish.name}
                                            </p>
                                            <p key={i} className="pb-3">
                                                Descrizione: {dish.description}
                                            </p>

                                            {dish.allergens.map(
                                                (ingrediente: string, i: number) => {
                                                    return (
                                                        <>
                                                            <p key={i} className="pb-3">
                                                                Allergeni: {ingrediente}
                                                            </p>
                                                        </>
                                                    );
                                                }
                                            )}

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
        </>
    );
};

export default DescriptionEvento;
