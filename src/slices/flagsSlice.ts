import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const flagsSlice = createSlice({
    name: 'flags',
    initialState: {
        showFeelsLike: false,
        showWind: false,
        showPressure: false,
        showHumidity: false,
        showDaytime: false,
        showBackground: true,
    },
    reducers: {
        setShowFeelsLike: (state, action: PayloadAction<boolean>) => {
            state.showFeelsLike = action.payload;
            localStorage.setItem('feelsLike', action.payload.toString());
        },
        setShowWind: (state, action: PayloadAction<boolean>) => {
            state.showWind = action.payload;
            localStorage.setItem('showWind', action.payload.toString());
        },
        setShowPressure: (state, action: PayloadAction<boolean>) => {
            state.showPressure = action.payload;
            localStorage.setItem('showPressure', action.payload.toString());
        },
        setShowHumidity: (state, action: PayloadAction<boolean>) => {
            state.showHumidity = action.payload;
            localStorage.setItem('showHumidity', action.payload.toString());
        },
        setShowDaytime: (state, action: PayloadAction<boolean>) => {
            state.showDaytime = action.payload;
            localStorage.setItem('showDaytime', action.payload.toString());
        },
        setShowBackground: (state, action: PayloadAction<boolean>) => {
            state.showBackground = action.payload;
            localStorage.setItem('showBackground', action.payload.toString());
        },
        setFlagsFromLocalStorage: (state) => {
            state.showFeelsLike = localStorage.getItem('feelsLike') === 'true';
            state.showWind = localStorage.getItem('showWind') === 'true';
            state.showPressure = localStorage.getItem('showPressure') === 'true';
            state.showHumidity = localStorage.getItem('showHumidity') === 'true';
            state.showDaytime = localStorage.getItem('showDaytime') === 'true';
            const showBackground = localStorage.getItem('showBackground');
            if (showBackground) {
                state.showBackground = showBackground === 'true';
            }
        }
    }
});

export const {setShowFeelsLike, setShowWind, setShowPressure, setShowHumidity, setFlagsFromLocalStorage, setShowDaytime, setShowBackground}
    = flagsSlice.actions;
export default flagsSlice.reducer;