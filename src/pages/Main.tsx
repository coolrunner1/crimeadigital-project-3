import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import {Loading} from "./Loading.tsx";
import {Forecast} from "../types/Forecast.ts";

export const Main = () => {
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

    const latitude = useSelector((state: RootState) => state.location.latitude);
    const longitude = useSelector((state: RootState) => state.location.longitude);

    const networkRequest = (url: string) => {
        fetch(url+`&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
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
        if (latitude === 0 && longitude === 0) {
            networkRequest("https://api.openweathermap.org/data/2.5/weather?q=Sevastopol");
        } else {
            networkRequest("https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude)
        }
        console.log(forecast);
    }, []);

    return (
        <>
            {!loaded && <Loading />}
            {loaded && <>
                <div className="h-svh flex">
                    <div className="flex flex-col gap-3 items-center justify-center w-96 sm:w-2xl sm:p-12 sm:shadow sm:rounded-2xl m-auto">
                        <div className="text-4xl font-bold">{forecast.name}, {forecast.sys.country}</div>
                        <div className="text-2xl font-light">{forecast.main.temp}°C</div>
                        <div className="text-base font-light">Feels like {forecast.main.feels_like}°C</div>
                        <div className="text-2xl font-light flex flex-col text-center justify-center">
                            <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt="weather-icon"/>
                            <span className="text-2xl">{forecast.weather[0].main}</span>
                            <span className="text-xl">{forecast.weather[0].description}</span></div>
                        <div className="flex flex-col gap-3 mt-5">
                            <div className="text-2xl font-light shadow rounded p-4">Wind {forecast.wind.speed} m/s</div>
                            <div className="text-2xl font-light shadow rounded p-4">Pressure {forecast.main.pressure} hPa</div>
                            <div className="text-2xl font-light shadow rounded p-4">Humidity {forecast.main.humidity}%</div>
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