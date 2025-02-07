import {Weather} from "./Weather.ts";

export type Forecast = {
    name: string;
    sys: {
        country: string;
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