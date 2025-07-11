import {MouseEventHandler} from "react";

export type ButtonProps = {
    label: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}

export const Button = (
    props: ButtonProps
) => {
    return (
        <button
            className="px-5 py-3 rounded-xl shadow-2xl bg-transparent-100 hover:bg-transparent-200 disabled:bg-gray-300 backdrop-blur-xl transition-all duration-300 ease-in-out"
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.label}
        </button>
    );
};