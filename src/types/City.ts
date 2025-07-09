export type City = {
    id: string;
    name: string;
    localNames?: string[];
    state?: string;
    country: string;
    lat: number;
    lon: number;
}

export type Cities = {
    [key: string]: City;
}