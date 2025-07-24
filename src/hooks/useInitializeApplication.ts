import {useEffect, useState} from "react";
import {useDispatch} from 'react-redux';
import {setLatitude, setLongitude} from "../slices/locationSlice.ts";
import {setSavedCitiesFromLocalStorage} from "../slices/savedCitiesSlice.ts";
import {setFlagsFromLocalStorage} from "../slices/flagsSlice.ts";
import {getWeatherByCoordinates} from "../api/weather.ts";

export const useInitializeApplication = () => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        dispatch(setSavedCitiesFromLocalStorage());
        dispatch(setFlagsFromLocalStorage());
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                let validLocation = false;
                const {latitude, longitude} = position.coords;
                await getWeatherByCoordinates(latitude, longitude)
                    .then(() => validLocation = true)
                    .catch(() => validLocation = false);
                if (validLocation) {
                    dispatch(setLatitude(latitude));
                    dispatch(setLongitude(longitude));
                } else {
                    alert("Invalid geolocation provided");
                }
                setLoaded(true);
            },(error) => {
                console.error(error);
                setLoaded(true);
            });
        } else {
            console.log("Geolocation not supported");
            setLoaded(true);
        }
    }, []);

    return loaded;
};