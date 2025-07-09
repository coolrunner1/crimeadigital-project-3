import {configureStore} from "@reduxjs/toolkit";
import locationSlice from "../slices/locationSlice.ts";
import flagsSlice from "../slices/flagsSlice.ts";
import savedSlice from "../slices/savedCitiesSlice.ts";

export const store = configureStore({
    reducer: {
        location: locationSlice,
        flags: flagsSlice,
        saved: savedSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export type RootState = ReturnType<typeof store.getState>