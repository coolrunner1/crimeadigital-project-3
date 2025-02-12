import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const flagsSlice = createSlice({
    name: 'flags',
    initialState: {
        showFeelsLike: true,
        showWind: true,
        showPressure: false,
        showHumidity: true,
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
        setFlagsFromLocalStorage: (state) => {
            if (localStorage.getItem('feelsLike') === null) {
                return;
            }
            state.showFeelsLike = localStorage.getItem('feelsLike') === 'true';
            state.showWind = localStorage.getItem('showWind') === 'true';
            state.showPressure = localStorage.getItem('showWind') === 'true';
            state.showHumidity = localStorage.getItem('showWind') === 'true';
        }
    }
});

export const {setShowFeelsLike, setShowWind, setShowPressure, setShowHumidity, setFlagsFromLocalStorage} = flagsSlice.actions;
export default flagsSlice.reducer;