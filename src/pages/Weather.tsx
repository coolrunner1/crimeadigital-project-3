import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import {Loading} from "./Loading.tsx";
import {Forecast} from "../types/Forecast.ts";
import {WeatherBox} from "../components/WeatherBox.tsx";

export const Weather = () => {
    const [forecast, setForecast] = useState<Forecast>({
        name: "",
        sys: {
            country: ""
        },
        main: {
            temp: 0,
            feels_like: 0,
            pressure: 0,
            humidity: 0,
        },
        wind: {
            speed: 0,
        },
        weather: [{
            icon: "",
            main: "",
            description: "",
        }]
    });

    const [loaded, setLoaded] = useState(false);

    const location = useSelector((state: RootState) => state.location);
    const flags = useSelector((state: RootState) => state.flags);

    const networkRequest = (url: string) => {
        if (loaded) {
            return;
        }

        fetch(`${url}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setForecast(json);
                setLoaded(true);
            })
            .catch(err => {
                console.log(err);
                alert("Network Error");
            });
    };

    useEffect(() => {
        if (location.latitude === 0 && location.longitude === 0) {
            networkRequest("https://api.openweathermap.org/data/2.5/weather?q=Sevastopol");
        } else {
            networkRequest(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}`)
        }
        console.log(forecast);
    }, []);

    return (
        <>
            {!loaded && <Loading />}
            {loaded && <>
                <div className="h-svh flex">
                    <div className="flex flex-col gap-3 items-center justify-center w-96 sm:w-2xl sm:p-12 sm:shadow sm:dark:shadow-lg sm:rounded-2xl m-auto">
                        <div className="text-4xl font-bold">{forecast.name}, {forecast.sys.country}</div>
                        <div className="text-2xl font-light">{forecast.main.temp}°C</div>
                        {flags.showFeelsLike &&
                            <div className="text-base font-light">Feels like {forecast.main.feels_like}°C</div>
                        }
                        <div className="text-2xl font-light flex flex-col text-center justify-center">
                            <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt="weather-icon"/>
                            <span className="text-2xl">{forecast.weather[0].main}</span>
                            <span className="text-xl">{forecast.weather[0].description}</span></div>
                        <div className="flex flex-col gap-3 mt-5">
                            {flags.showWind &&
                                <WeatherBox label={`Wind ${forecast.wind.speed} m/s`}/>
                            }
                            {flags.showPressure &&
                                <WeatherBox label={`Pressure ${forecast.main.pressure} hPa`}/>
                            }
                            {flags.showHumidity &&
                                <WeatherBox label={`Humidity ${forecast.main.humidity}%`}/>
                            }
                        </div>

                        <div className={"grid grid-cols-3 grid-rows-1 gap-3 md:mt-5"}>
                            <button>Back</button>
                            <button>Remove</button>
                            <button>Forward</button>
                        </div>
                    </div>
                </div>
            </>}
        </>
    );
};