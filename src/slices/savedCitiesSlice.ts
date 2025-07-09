import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Cities, City} from "../types/City"

const savedCitiesSlice = createSlice({
    name: 'cities',
    initialState: {
        cities: ({} as Cities),
    },
    reducers: {
        appendToCities: (state, action: PayloadAction<City>) => {
            state.cities[action.payload.id] = action.payload;
            localStorage.setItem('cities', JSON.stringify(state.cities));
        },
        removeFromCities: (state, action: PayloadAction<City>) => {
            delete state.cities[action.payload.id];
            localStorage.setItem('cities', JSON.stringify(state.cities));
        },
        setSavedCitiesFromLocalStorage: (state) => {
            try {
                const cities: Cities | null = JSON.parse(String(localStorage.getItem("cities")));
                if (!cities) {
                    localStorage.setItem('cities', JSON.stringify(state.cities));
                    return;
                }
                state.cities = cities;
            } catch (error) {
                console.error(error);
                localStorage.setItem('cities', JSON.stringify(state.cities));
            }
        },
    },
});

export const {appendToCities, removeFromCities, setSavedCitiesFromLocalStorage} = savedCitiesSlice.actions;
export default savedCitiesSlice.reducer;