// Tipizzazione base, ovvero che sia EventType e EventDetailType hano in comune
type EventBaseType = {
    id: number;
    name: string;
    coverImage: string;
    date: string;
    dresscode: string;
    price: number;
    includedDrinks: string[];
    tags: string[];
    isAperitivoIncluded: boolean;
};

export type DishType = {
    name: string;
    description: string;
    allergens: string[];
};

// Tipizzazione dell'evento nella home
// non si può chiamare EventType, sennò crea conflitto con firebase
export type EventListType = EventBaseType & {
    description: {
        short: string;
    };
};

// Tipizzazione dell'evento nella pagina dettaglio
export type EventDetailType = EventBaseType & {
    description: {
        long: string[];
        short: string;
    };
    includedDishes: DishType[];
};
