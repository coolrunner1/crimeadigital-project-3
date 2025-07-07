import {SearchBar} from "../components/SearchBar.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {City} from "../types/City.ts";
import {SearchItem} from "../components/SearchItem.tsx";
import {v4 as uuidv4} from 'uuid';
import {useSearchParams} from "react-router";
import {Button} from "../components/Button.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchCities} from "../api/cities.ts";
import {Loading} from "../components/Loading.tsx";
import {SearchContainer} from "../components/SearchContainer.tsx";
import {SearchItemsContainer} from "../components/SearchItemsContainer.tsx";

export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchParam = searchParams.get("q") || "";
    const [search, setSearch] = useState<string>(searchParam);

    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery<City[]>({
        queryKey: ['search', searchParam],
        queryFn: fetchCities
    });

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const handleSearchChange = () => {
        setSearchParams((searchParams) => {
            searchParams.set("q", search);
            return searchParams;
        });
    }

    const keyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearchChange();
        }
    }

    return (
        <div className="mt-[25px] sm:mt-0 sm:h-svh flex">
            <SearchContainer>
                <span className="font-bold text-4xl">Search</span>
                <div className="flex flex-row w-full gap-3">
                    <SearchBar
                        placeholder={"Find cities"}
                        keyPressHandler={keyPressHandler}
                        search={search}
                        setSearch={onSearchChange}
                    />
                    <Button
                        label={"Search"}
                        onClick={() => handleSearchChange()}
                    />
                </div>

                {isLoading && <Loading/>}

                {!isLoading && !isError &&
                    <>
                        {data &&
                            <>
                                {!data.length && searchParam && <div className={"text-2xl"}>No cities found</div>}
                                <SearchItemsContainer>
                                    {data.length > 0 &&
                                        data.map((item) => (<SearchItem item={item} key={uuidv4()}/>))}
                                </SearchItemsContainer>
                            </>
                        }
                    </>
                }

                {error && <div>{error.message}</div>}
            </SearchContainer>
        </div>
    );
};