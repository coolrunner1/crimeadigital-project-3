import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import {WeatherInfoBox} from "../components/WeatherInfoBox.tsx";
import {City} from "../types/City.ts";
import {removeFromCities} from "../slices/savedSlice.ts";
import {useNavigate, useSearchParams} from "react-router";
import {Button} from "../components/Button.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchWeather} from "../api/weather.ts";
import {Loading} from "../components/Loading.tsx";

export const Weather = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const [search, setSearch] = useState<string | null>();
    const [latitude, setLatitude] = useState<number | null>();
    const [longitude, setLongitude] = useState<number | null>();
    const [allowRequest, setAllowRequest] = useState<boolean>(false);

    const queryStringEntered = searchParams.toString().length > 0;
    const [index, setIndex] = useState(0);

    const location = useSelector((state: RootState) => state.location);
    const flags = useSelector((state: RootState) => state.flags);
    const cities: City[] = useSelector((state: RootState) => Array.from(state.saved.cities.values()));

    const navigate = useNavigate();

    const {
        data: forecast,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["weather", search, latitude, longitude],
        queryFn: fetchWeather,
        enabled: allowRequest
    })

    const changeCity = async () => {
        if (queryStringEntered) {
            setLongitude(Number(searchParams.get("lon")));
            setLatitude(Number(searchParams.get("lat")));
            setSearch(searchParams.get("q"));
            setAllowRequest(true);
            return;
        }
        if (index > 0 && index <= cities.length) {
            const i = index - 1;
            setLatitude(cities[i].lat);
            setLongitude(cities[i].lon);
            setSearch(null);
        } else if (index === 0) {
            if (location.latitude === 0 && location.longitude === 0) {
                setLongitude(null);
                setLatitude(null);
                setSearch(null);
            } else {
                setLatitude(location.latitude);
                setLongitude(location.longitude);
                setSearch(null);
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

    const getDaytime = () => {
        if (!forecast) return null;
        const sunrise = new Date((forecast.sys.sunrise + forecast.timezone) * 1000);
        const sunset = new Date((forecast.sys.sunset+ forecast.timezone) * 1000);
        return `${sunrise.getUTCHours()}:${("0"+sunrise.getUTCMinutes()).slice(-2)} - 
        ${sunset.getUTCHours()}:${("0"+sunset.getUTCMinutes()).slice(-2)}`;
    }

    const handleBackClick = () => {
        if (searchParams.get("fromSearch") === "true") {
            navigate(-1)
        } else {
            navigate('/')
        }
    }

    useEffect(() => {
        changeCity();
    }, [index, queryStringEntered]);

    return (
        <>
            <div className="sm:h-svh flex mt-[25px] sm:mt-0">
                <div className="flex flex-col gap-3 items-center justify-center w-96 sm:w-2xl sm:p-12 sm:shadow sm:dark:shadow-lg sm:rounded-2xl m-auto sm:backdrop-blur-xl z-99">
                    {isLoading && <div className="my-50"><Loading/></div>}
                    {error && <div className="text-4xl font-bold">{error.message}</div>}
                    {!isLoading && !isError && forecast && <>
                        <div className="text-4xl font-bold">{forecast.name}, {forecast.sys.country}</div>
                        <div className="text-2xl font-light">{forecast.main.temp}°C</div>
                        {flags.showFeelsLike &&
                            <div className="text-base font-light">Feels like {forecast.main.feels_like}°C</div>
                        }
                        <div className="text-2xl font-light flex flex-col text-center justify-center">
                            <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt="weather-icon"/>
                            <span className="text-2xl">{forecast.weather[0].main}</span>
                            <span className="text-xl">{forecast.weather[0].description}</span></div>
                        <div className={
                            (flags.showWind && flags.showHumidity && flags.showPressure && flags.showDaytime)
                                ? "grid grid-rows-4 grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-2 sm:gap-4 mt-5"
                                : "flex flex-col gap-3 mt-5"}>
                            {flags.showWind &&
                                <WeatherInfoBox label={`Wind ${forecast.wind.speed} m/s`}/>
                            }
                            {flags.showPressure &&
                                <WeatherInfoBox label={`Pressure ${forecast.main.pressure} hPa`}/>
                            }
                            {flags.showHumidity &&
                                <WeatherInfoBox label={`Humidity ${forecast.main.humidity}%`}/>
                            }
                            {flags.showDaytime &&
                                <WeatherInfoBox label={`Daytime ${getDaytime()}`}/>
                            }

                        </div>
                        {!queryStringEntered ?
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
                            </div> :
                            <Button
                                onClick={() => handleBackClick()}
                                label={"Back"}
                            />
                        }
                    </>}
                </div>
            </div>
        </>
    );
};