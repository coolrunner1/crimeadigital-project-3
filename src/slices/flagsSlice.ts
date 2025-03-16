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
        darkMode: false,
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
            document.body.classList.toggle('background');
            localStorage.setItem('showBackground', action.payload.toString());
        },
        setDarkMode: (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload;
            document.body.classList.toggle('dark');
            localStorage.setItem('darkMode', action.payload.toString());
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
            if (state.showBackground) {
                document.body.classList.add('background');
            }

            const darkMode = localStorage.getItem('darkMode');
            if (darkMode) {
                state.darkMode = darkMode === 'true';
            } else {
                state.darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
            }
            if (state.darkMode) {
                document.body.classList.add('dark');
            }
        }
    }
});

export const {setShowFeelsLike, setShowWind, setShowPressure, setShowHumidity, setFlagsFromLocalStorage, setShowDaytime, setShowBackground, setDarkMode}
    = flagsSlice.actions;
export default flagsSlice.reducer;