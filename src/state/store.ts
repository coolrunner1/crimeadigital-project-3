import {configureStore} from "@reduxjs/toolkit";
import locationSlice from "../slices/locationSlice.ts";
import flagsSlice from "../slices/flagsSlice.ts";

export const store = configureStore({
    reducer: {
        location: locationSlice,
        flags: flagsSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>