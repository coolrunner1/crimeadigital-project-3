import { createSlice, PayloadAction} from '@reduxjs/toolkit'

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        longitude: 0,
        latitude: 0,
    },
    reducers: {
        setLongitude: (state, action: PayloadAction<number>) => {
            state.longitude = action.payload;
        },
        setLatitude: (state, action: PayloadAction<number>) => {
            state.latitude = action.payload
        }
    }
});

export const {setLongitude, setLatitude} = locationSlice.actions;
export default locationSlice.reducer;