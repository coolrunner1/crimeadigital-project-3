import {City} from "../types/City.ts";

export const fetchCities = async ({queryKey}: any): Promise<City[]> => {
    const [_key, search] = queryKey;
    if (!search) return [];
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/geo/1.0/direct?q=${search}&limit=10&appid=${import.meta.env.VITE_API_KEY}`)
    if (!res.ok) {
        throw new Error(`Failed to fetch cities`);
    }

    const data: City[] = await res.json();

    return data.map((city) => ({
        ...city,
        id: `${city.lat}${city.lon}`,
    }));
}