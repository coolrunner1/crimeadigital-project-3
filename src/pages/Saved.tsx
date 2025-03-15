import {SearchBar} from "../components/SearchBar.tsx";
import {SearchItem} from "../components/SearchItem.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import {ChangeEvent, KeyboardEvent, useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {Button} from "../components/Button.tsx";

export const Saved = () => {
    const allCities = useSelector((state: RootState)=> Array.from(state.saved.cities));

    const [search, setSearch] = useState('');
    const [cities, setCities] = useState(allCities);

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const getCities = () => {
        if (search === "") {
            setCities(allCities);
            return;
        }
        setCities(allCities
            .filter(cities =>
                `${cities[1].name} ${cities[1].state !== undefined && cities[1].state} ${cities[1].country}`
                    .toLowerCase()
                    .includes(search.toLowerCase())));
    }

    const keyPressHandler =  (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            getCities();
        }
    }

    useEffect(() => {
        getCities();
    }, [allCities.length])

    return (
        <div className="mt-[25px] sm:mt-0 sm:h-svh flex">
            <div className="flex flex-col gap-10 items-center justify-center w-96 sm:w-2xl sm:p-12 sm:shadow sm:dark:shadow-lg sm:rounded-2xl m-auto sm:backdrop-blur-xl z-99">
                <span className="font-bold text-4xl">Saved cities</span>
                <div className="flex flex-row w-full gap-3">
                    <SearchBar
                        placeholder={"Find saved cities"}
                        keyPressHandler={keyPressHandler}
                        search={search}
                        setSearch={onSearchChange}
                    />
                    <Button label={"Search"} onClick={getCities}/>
                </div>
                {allCities.length === 0
                    && <div className={"text-2xl"}>No saved cities yet</div>}
                {allCities.length !== 0 && cities.length === 0
                    && <div className={"text-2xl"}>No cities found</div>}
                <div className="overflow-hidden md:w-md lg:w-lg h-full">
                    <div className="flex flex-col gap-5 max-h-[450px] overflow-y-scroll md:w-md lg:w-lg pr-[17px] box-content">
                        {cities.map((item) => (<SearchItem item={item[1]} key={uuidv4()}/>))}
                    </div>
                </div>
            </div>
        </div>
    );
};