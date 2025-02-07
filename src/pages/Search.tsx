import {SearchBar} from "../components/SearchBar.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

export const Search = () => {
    const [search, setSearch] = useState('');

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const keyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {

            fetch(`&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                })
                .catch(err => {
                    console.log(err);
                    alert("Network Error");
                });
        }
    }

    return (
        <>
            <div className="h-svh flex">
                <div className="flex flex-col gap-10 items-center justify-center w-96 sm:w-2xl sm:p-12 sm:shadow sm:dark:shadow-lg sm:rounded-2xl m-auto">
                    <span className="font-bold text-4xl">Search</span>
                    <SearchBar
                        placeholder={"Find cities"}
                        keyPressHandler={keyPressHandler}
                        search={search}
                        setSearch={onSearchChange}
                    />
                </div>
            </div>
        </>
    );
};