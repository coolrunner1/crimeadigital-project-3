import { createSlice, PayloadAction} from '@reduxjs/toolkit'

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        city: "",
        country: "",
        longitude: 0,
        latitude: 0,
    },
    reducers: {
        setCity: (state, action: PayloadAction<string>) => {
            state.city = action.payload;
        },
        setCountry: (state, action: PayloadAction<string>) => {
            state.country = action.payload;
        },
        setLongitude: (state, action: PayloadAction<number>) => {
            state.longitude = action.payload;
        },
        setLatitude: (state, action: PayloadAction<number>) => {
            state.latitude = action.payload
        }
    }
});

export const {setCity, setCountry, setLongitude, setLatitude} = locationSlice.actions;
export default locationSlice.reducer;