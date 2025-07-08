import {ContainerProps} from "../Search/SearchContainer.tsx";

export const WeatherContainer = (props: ContainerProps) => {
    return (
        <div className="flex flex-col gap-3 items-center justify-center w-96 sm:w-2xl sm:p-12 sm:shadow sm:dark:shadow-lg sm:rounded-2xl m-auto sm:backdrop-blur-xl z-99">
            {props.children}
        </div>
    );
};