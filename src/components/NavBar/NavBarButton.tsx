import {ButtonProps} from "../Global/Button.tsx";

export const NavBarButton = (props: ButtonProps) => {
    return (
        <button
            className="p-3 text-xl border-b-2 border-[#00000000] hover:border-[#202c36] dark:hover:border-white transition-all duration-300 ease-in-out"
            onClick={props.onClick}
        >
            {props.label}
        </button>
    );
};