import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {City} from "../types/City"

const savedSlice = createSlice({
    name: 'cities',
    initialState: {
        cities: new Map<string, City>,
    },
    reducers: {
        appendToCities: (state, action: PayloadAction<City>) => {
            state.cities.set(`${action.payload.lat}${action.payload.lon}`, action.payload);
            localStorage.setItem(`${action.payload.lat}${action.payload.lon}`, JSON.stringify(action.payload));
        },
        removeFromCities: (state, action: PayloadAction<City>) => {
            state.cities.delete(`${action.payload.lat}${action.payload.lon}`);
            localStorage.removeItem(`${action.payload.lat}${action.payload.lon}`);
        },
        loadFromLocalStorage: (state) => {
            try {
                const items: City[] = Object.keys(localStorage)
                    .filter(key => parseInt(key))
                    .map(key => JSON.parse(localStorage[key]));
                items.forEach((item) => state.cities.set(`${item.lat}${item.lon}`, item));
            } catch (error) {
                console.error(error)
            }
        },
    },
});

export const {appendToCities, removeFromCities, loadFromLocalStorage} = savedSlice.actions;
export default savedSlice.reducer;