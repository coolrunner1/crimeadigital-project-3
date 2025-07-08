import {ContainerProps} from "./SearchContainer.tsx";

export const SearchItemsContainer = (props: ContainerProps) => {
    return (
        <div className="overflow-hidden md:w-md lg:w-lg h-full">
            <div className="flex flex-col gap-5 max-h-[450px] overflow-y-scroll md:w-md lg:w-lg sm:pr-[17px] box-content transition-all duration-300 ease-in-out">
                {props.children}
            </div>
        </div>
    );
};