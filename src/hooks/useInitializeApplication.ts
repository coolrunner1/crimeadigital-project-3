import {useEffect, useState} from "react";
import {useDispatch} from 'react-redux';
import {setLatitude, setLongitude} from "../slices/locationSlice.ts";
import {enableMapSet} from "immer";
import {loadFromLocalStorage} from "../slices/savedSlice.ts";
import {setFlagsFromLocalStorage} from "../slices/flagsSlice.ts";
import {getWeatherByCoordinates} from "../api/weather.ts";

export const useInitializeApplication = () => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        enableMapSet();
        dispatch(loadFromLocalStorage());
        dispatch(setFlagsFromLocalStorage());
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                let validLocation = false;
                await getWeatherByCoordinates(position.coords.latitude.toString(), position.coords.longitude.toString())
                    .then(() => validLocation = true)
                    .catch(() => validLocation = false);
                if (validLocation) {
                    dispatch(setLatitude(position.coords.latitude));
                    dispatch(setLongitude(position.coords.longitude));
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