import {SearchBar} from "../components/Search/SearchBar.tsx";
import {SearchItem} from "../components/Search/SearchItem.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import {ChangeEvent, KeyboardEvent, useEffect, useState} from "react";
import {Button} from "../components/Global/Button.tsx";
import {SearchContainer} from "../components/Search/SearchContainer.tsx";
import {SearchItemsContainer} from "../components/Search/SearchItemsContainer.tsx";

export const Saved = () => {
    const allCities = useSelector((state: RootState)=> Object.entries(state.saved.cities));

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
            <SearchContainer>
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
                <SearchItemsContainer>
                    {cities.map((item) => (<SearchItem item={item[1]} key={item[0]}/>))}
                </SearchItemsContainer>
            </SearchContainer>
        </div>
    );
};