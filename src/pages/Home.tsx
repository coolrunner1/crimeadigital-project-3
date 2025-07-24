import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import {City} from "../types/City.ts";
import {removeFromCities} from "../slices/savedCitiesSlice.ts";
import {Button} from "../components/Global/Button.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchWeather} from "../api/weather.ts";
import {WeatherForecast} from "../components/Weather/WeatherForecast.tsx";
import { WeatherContainer } from "../components/Weather/WeatherContainer.tsx";
import {useNavigate, useSearchParams} from "react-router";
import {WeatherForecastLoadingPlaceholder} from "../components/Weather/WeatherForecastLoadingPlaceholder.tsx";

export const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.size) navigate("/weather?"+searchParams.toString());
    }, [searchParams]);

    const latitude = useRef<number | null>(null);
    const longitude = useRef<number | null>(null);
    const [allowRequest, setAllowRequest] = useState(false);

    const [index, setIndex] = useState(0);

    const location = useSelector((state: RootState) => state.location);
    const cities: City[] = useSelector((state: RootState) => Object.values(state.saved.cities));

    const {
        data: forecast,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["weather", null, latitude.current, longitude.current],
        queryFn: fetchWeather,
        enabled: allowRequest,
        refetchInterval: 300000,
    })

    const changeCity = async () => {
        setAllowRequest(false);
        if (index > 0 && index <= cities.length) {
            const i = index - 1;
            latitude.current = cities[i].lat;
            longitude.current = cities[i].lon;
        } else if (index === 0) {
            if (location.latitude === 0 && location.longitude === 0) {
                longitude.current = null;
                latitude.current = null;
            } else {
                latitude.current = location.latitude;
                longitude.current = location.longitude;
            }
        } else {
            alert("Error! Please refresh the page");
        }
        setAllowRequest(true);
    };

    const removeCity = () => {
        setIndex(index-1);
        dispatch(removeFromCities(cities[index-1]));
    };

    useEffect(() => {
        changeCity();
    }, [index]);

    return (
        <>
            <div className="sm:h-svh flex mt-[25px] sm:mt-0">
                <WeatherContainer>
                    {error &&
                        <div
                            className="text-2xl font-bold"
                        >
                            {error.message}
                        </div>
                    }
                    {isLoading &&
                        <WeatherForecastLoadingPlaceholder/>
                    }
                    {!isLoading && !isError && forecast &&
                        <WeatherForecast forecast={forecast} />
                    }
                    <div className={"grid grid-cols-3 grid-rows-1 gap-3 mb-3 sm:mb-0 md:mt-5"}>
                        <Button
                            disabled={index === 0}
                            onClick={() => setIndex(index-1)}
                            label={"Back"}
                        />
                        <Button
                            disabled={index === 0}
                            onClick={removeCity}
                            label={"Remove"}
                        />
                        <Button
                            disabled={index === cities.length}
                            onClick={() => setIndex(index+1)}
                            label={"Forward"}
                        />
                    </div>
                </WeatherContainer>
            </div>
        </>
    );
};