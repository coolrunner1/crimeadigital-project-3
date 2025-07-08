export type Flags = {
    showFeelsLike: boolean,
    showWind: boolean,
    showPressure: boolean,
    showHumidity: boolean,
    showDaytime: boolean,
    showBackground: boolean,
    darkMode: boolean,
}

export const Flags = (f: unknown): Flags | null => {
    const keys: (keyof Flags)[] = [
        "showFeelsLike",
        "showWind",
        "showPressure",
        "showHumidity",
        "showDaytime",
        "showBackground",
        "darkMode",
    ];

    if (
        typeof f === "object" &&
        f !== null &&
        keys.every(key => key in f && typeof (f as any)[key] === "boolean")
    ) {
        return f as Flags
    }
    return null
}