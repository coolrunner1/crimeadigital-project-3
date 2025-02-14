import {SearchBar} from "../components/SearchBar.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {City} from "../types/City.ts";
import {SearchItem} from "../components/SearchItem.tsx";
import { v4 as uuidv4 } from 'uuid';

export const Search = () => {
    const [search, setSearch] = useState<string>('');
    const [results, setResults] = useState<City[]>([]);
    const [notFound, setNotFound] = useState<boolean>(false);

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setNotFound(false);
    }

    const getCities = async () => {
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=10&appid=${import.meta.env.VITE_API_KEY}`)
            .then(res => res.json())
            .then(json => {
                if (json.length > 0) {
                    setNotFound(false);
                } else {
                    setNotFound(true);
                }

                setResults(json);
            })
            .catch(err => {
                console.error(err);
                alert("Network Error");
            });
    }

    const keyPressHandler = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            await getCities();
        }
    }

    return (
        <div className="mt-[25px] sm:mt-0 sm:h-svh flex">
            <div className="flex flex-col gap-10 items-center justify-center w-96 sm:w-2xl sm:p-12 sm:shadow sm:dark:shadow-lg sm:rounded-2xl m-auto">
                <span className="font-bold text-4xl">Search</span>
                <div className="flex flex-row w-full gap-5">
                    <SearchBar
                        placeholder={"Find cities"}
                        keyPressHandler={keyPressHandler}
                        search={search}
                        setSearch={onSearchChange}
                    />
                    <button onClick={getCities}>Search</button>
                </div>

                {notFound
                    && <div className={"text-2xl"}>No cities found</div>}

                <div className="flex flex-col gap-5">
                    {results.length > 0 &&
                        results.map((item) =>
                            (<SearchItem item={item} key={uuidv4()}/>))}
                </div>
            </div>
        </div>
    );
};