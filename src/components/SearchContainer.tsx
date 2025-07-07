import {ReactNode} from "react";

export type SearchContainerProps = {
    children: ReactNode;
}

export const SearchContainer = (props: SearchContainerProps) => {
    return (
        <div className="flex flex-col gap-10 items-center justify-center w-96 sm:w-2xl sm:p-12 sm:shadow sm:dark:shadow-lg sm:rounded-2xl m-auto sm:backdrop-blur-xl z-99 transition-all duration-300 ease-in-out">
            {props.children}
        </div>
    );
};