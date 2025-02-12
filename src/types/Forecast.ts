import {Weather} from "./Weather.ts";

export type Forecast = {
    name: string;
    timezone: number;
    sys: {
        country: string;
        sunset: number;
        sunrise: number;
    };
    main: {
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
    };
    wind: {
        speed: number;
    }
    weather: Weather[];
}