import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import {Loading} from "../components/Loading.tsx";
import {Forecast} from "../types/Forecast.ts";
import {WeatherInfoBox} from "../components/WeatherInfoBox.tsx";
import {City} from "../types/City.ts";
import {removeFromCities} from "../slices/savedSlice.ts";
import {useNavigate} from "react-router";
import {Button} from "../components/Button.tsx";

export const Weather = () => {
    const [forecast, setForecast] = useState<Forecast|null>(null);

    const dispatch = useDispatch();

    const [loaded, setLoaded] = useState(false);
    const [queryStringEntered, setQueryStringEntered] = useState(false);
    const [index, setIndex] = useState(0);

    const location = useSelector((state: RootState) => state.location);
    const flags = useSelector((state: RootState) => state.flags);
    const cities: City[] = useSelector((state: RootState) => Array.from(state.saved.cities.values()));

    const navigate = useNavigate();

    const networkRequest = async (url: string) => {
        fetch(`${url}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
            .then(res => res.json())
            .then(json => {
                setForecast(json);
                setLoaded(true);
            })
            .catch(err => {
                console.log(err);
                alert("Network Error");
            });
    };

    const getDefaultForecast = async () => {
        if (location.latitude === 0 && location.longitude === 0) {
            await networkRequest("https://api.openweathermap.org/data/2.5/weather?q=Sevastopol");
        } else {
            await networkRequest(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}`)
        }
    };

    const changeCity = async () => {
        setLoaded(false);
        if (globalThis.location.search.slice(1)) {
            setQueryStringEntered(true);
            await networkRequest(`https://api.openweathermap.org/data/2.5/weather?${globalThis.location.search.slice(1)}`);
            return;
        }
        if (index > 0 && index <= cities.length) {
            const i = index - 1;
            await networkRequest(`https://api.openweathermap.org/data/2.5/weather?lat=${cities[i].lat}&lon=${cities[i].lon}`);
        } else if (index === 0) {
            await getDefaultForecast();
        } else {
            alert("Error! Please refresh the page");
        }
    };

    const removeCity = () => {
        setLoaded(false);
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

    useEffect(() => {
        changeCity();
    }, [index]);

    return (
        <>
            {!loaded && <Loading />}
            {loaded && forecast && <>
                <div className="sm:h-svh flex mt-[25px] sm:mt-0">
                    <div className="flex flex-col gap-3 items-center justify-center w-96 sm:w-2xl sm:p-12 sm:shadow sm:dark:shadow-lg sm:rounded-2xl m-auto sm:backdrop-blur-xl z-99">
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
                                onClick={() => navigate(-1)}
                                label={"Back"}
                            />
                        }
                    </div>
                </div>
            </>}
        </>
    );
};