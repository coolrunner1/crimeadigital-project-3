import {ChangeEventHandler, KeyboardEventHandler} from "react";

export const SearchBar = (
    props: {placeholder: string;
        keyPressHandler: KeyboardEventHandler<HTMLInputElement>;
        search: string;
        setSearch: ChangeEventHandler<HTMLInputElement>;
    }) => {


    return (
        <div className="w-full">
            <div
                className="relative flex items-center w-full h-12 rounded-lg shadow-lg overflow-hidden bg-[#ffffff0f] backdrop-blur-xl">
                <div className="grid place-items-center h-full w-12 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </div>

                <input
                    className="peer h-full w-full outline-none text-sm light:text-gray-700 pr-2 bg-search"
                    type="text"
                    id="search"
                    value={props.search}
                    placeholder={props.placeholder}
                    onChange={props.setSearch}
                    onKeyDown={props.keyPressHandler}
                />
            </div>
        </div>
    );
};