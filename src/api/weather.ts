import {Forecast} from "../types/Forecast.ts";

const authKey = `&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
const baseUrl = `${import.meta.env.VITE_BASE_URL}/data/2.5/weather`;
const defaultCity = "Sevastopol";

export const fetchWeather = async ({queryKey}: any): Promise<Forecast> => {
    const [_key, search, lat, lon] = queryKey;

    if (search) {
        return await getWeatherByCity(search);
    }

    if (lat && lon) {
        return await getWeatherByCoordinates(lat, lon);
    }

    return await getDefaultWeather();
}

export const getWeatherByCity = async (city: string): Promise<Forecast> => {
    const res = await fetch(`${baseUrl}?q=${city}${authKey}`);
    if (!res.ok) {
        handleWeatherError(res);
    }
    return res.json();
}

export const getDefaultWeather = async (): Promise<Forecast> => {
    const res = await fetch(`${baseUrl}?q=${defaultCity}${authKey}`);
    if (!res.ok) {
        handleWeatherError(res);
    }
    return res.json();
}

export const getWeatherByCoordinates = async (lat: string | number, lon: string | number): Promise<Forecast> => {
    const res = await fetch(`${baseUrl}?lat=${lat}&lon=${lon}${authKey}`);
    if (!res.ok) {
        handleWeatherError(res);
    }
    return res.json();
}

const handleWeatherError = (res: Response) => {
    switch (res.status) {
        case 400:
            throw new Error("Bad request. Provided coordinates are invalid. Try disabling geolocation");
        case 401:
            throw new Error("Invalid api key");
        case 403:
            throw new Error("Location could not be found");
        default:
            throw new Error(`Failed to fetch weather`);
    }
}