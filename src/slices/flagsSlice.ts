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
        },
        setShowWind: (state, action: PayloadAction<boolean>) => {
            state.showWind = action.payload;
        },
        setShowPressure: (state, action: PayloadAction<boolean>) => {
            state.showPressure = action.payload;
        },
        setShowHumidity: (state, action: PayloadAction<boolean>) => {
            state.showHumidity = action.payload;
        },
    }
});

export const {setShowFeelsLike, setShowWind, setShowPressure, setShowHumidity} = flagsSlice.actions;
export default flagsSlice.reducer;