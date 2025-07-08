import {WeatherInfoBox} from "./WeatherInfoBox.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../state/store.ts";
import {Forecast} from "../../types/Forecast.ts";

export type WeatherForecastProps = {
    forecast: Forecast;
}

export const WeatherForecast = ({forecast}: WeatherForecastProps) => {
    const flags = useSelector((state: RootState) => state.flags);

    const getDaytime = () => {
        if (!forecast) return null;
        const sunrise = new Date((forecast.sys.sunrise + forecast.timezone) * 1000);
        const sunset = new Date((forecast.sys.sunset+ forecast.timezone) * 1000);
        return `${sunrise.getUTCHours()}:${("0"+sunrise.getUTCMinutes()).slice(-2)} - 
        ${sunset.getUTCHours()}:${("0"+sunset.getUTCMinutes()).slice(-2)}`;
    }

    return (
        <>
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
        </>
    );
};