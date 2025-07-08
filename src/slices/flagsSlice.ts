import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {deserializeFlags} from "../utils/deserializeFlags.ts";

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
            const flags = deserializeFlags();
            flags.showFeelsLike = action.payload;
            localStorage.setItem('flags', JSON.stringify(flags));
        },
        setShowWind: (state, action: PayloadAction<boolean>) => {
            state.showWind = action.payload;
            const flags = deserializeFlags();
            flags.showWind = action.payload;
            localStorage.setItem('flags', JSON.stringify(flags));
        },
        setShowPressure: (state, action: PayloadAction<boolean>) => {
            state.showPressure = action.payload;
            const flags = deserializeFlags();
            flags.showPressure = action.payload;
            localStorage.setItem('flags', JSON.stringify(flags));
        },
        setShowHumidity: (state, action: PayloadAction<boolean>) => {
            state.showHumidity = action.payload;
            const flags = deserializeFlags();
            flags.showHumidity = action.payload;
            localStorage.setItem('flags', JSON.stringify(flags));
        },
        setShowDaytime: (state, action: PayloadAction<boolean>) => {
            state.showDaytime = action.payload;
            const flags = deserializeFlags();
            flags.showDaytime = action.payload;
            localStorage.setItem('flags', JSON.stringify(flags));
        },
        setShowBackground: (state, action: PayloadAction<boolean>) => {
            state.showBackground = action.payload;
            document.body.classList.toggle('background');
            const flags = deserializeFlags();
            flags.showBackground = action.payload;
            localStorage.setItem('flags', JSON.stringify(flags));
        },
        setDarkMode: (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload;
            document.body.classList.toggle('dark');
            const flags = deserializeFlags();
            flags.darkMode = action.payload;
            localStorage.setItem('flags', JSON.stringify(flags));
        },
        setFlagsFromLocalStorage: (state) => {
            const flags = deserializeFlags();

            state.showFeelsLike = flags.showFeelsLike;
            state.showWind = flags.showFeelsLike;
            state.showPressure = flags.showPressure;
            state.showHumidity = flags.showHumidity;
            state.showDaytime = flags.showDaytime;
            state.showBackground = flags.showBackground;

            if (state.showBackground) {
                document.body.classList.add('background');
            }

            if (flags.darkMode) {
                state.darkMode = flags.darkMode;
            } else {
                state.darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
                if (flags.darkMode !== state.darkMode) {
                    flags.darkMode = state.darkMode;
                    localStorage.setItem("flags", JSON.stringify(flags));
                }
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