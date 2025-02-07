import {configureStore} from "@reduxjs/toolkit";
import locationSlice from "../slices/locationSlice.ts";

export const store = configureStore({
    reducer: {
        location: locationSlice
    }
});

export type RootState = ReturnType<typeof store.getState>