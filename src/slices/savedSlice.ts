import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {City} from "../types/City"

const savedSlice = createSlice({
    name: 'cities',
    initialState: {
        cities: new Map<string, City>,
    },
    reducers: {
        appendToCities: (state, action: PayloadAction<City>) => {
            state.cities.set(`${action.payload.lat}${action.payload.lon}`, action.payload)
        },
        removeFromCities: (state, action: PayloadAction<City>) => {
            state.cities.delete(`${action.payload.lat}${action.payload.lon}`);
        }
    }
});

export const {appendToCities, removeFromCities} = savedSlice.actions;
export default savedSlice.reducer;