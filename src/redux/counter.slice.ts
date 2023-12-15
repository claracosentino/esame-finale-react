import { createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

// Tipizzazione del valore di stato
export type CounterState = {
    email: string | null;
};

// Inizializzazione dello stato
const initialState: CounterState = {
    email: null,
};

// Definizione dela slice di Redux
export const counterSlice = createSlice({
    name: "counter",
    initialState: initialState,
    reducers: {
        getEmail: (state) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    state.email = user.email;
                } else {
                    state.email = null;
                }
            });
        },
    },
});

// Estraggo le azioni specificate nella slice
/* prima metodologia:  export const {increment} = counterSlice.actions */
export const counterActions = counterSlice.actions;

// Esporto il reducer generato dalla slice
export default counterSlice.reducer;
