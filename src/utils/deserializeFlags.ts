import {Flags} from "../types/Flags.ts";

export const deserializeFlags = (): Flags => {
    try {
        const deserialized = JSON.parse(String(localStorage.getItem('flags')));
        if (!Flags(deserialized)) {
            throw new Error('invalid data');
        }
        return deserialized;
    } catch {
        const body = {
            showFeelsLike: false,
            showWind: false,
            showPressure: false,
            showHumidity: false,
            showDaytime: false,
            showBackground: true,
            darkMode: false,
        }
        localStorage.setItem("flags", JSON.stringify(body));
        return body
    }
}