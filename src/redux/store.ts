import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter.slice";

// Creo lo store che conterrà i reducer
const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});

export default store;

// Espongo i tipi di redux utilizzando il type infer di TS
// stiamo dicendo che RootState ha lo stesso aspetto del valore di ritorno dello state dello store
export type RootState = ReturnType<typeof store.getState>; // è il tipo di ritorno dello state dello store
export type AppDispatch = typeof store.dispatch;
