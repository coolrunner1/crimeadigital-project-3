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
            className="px-5 py-3 rounded-xl shadow-2xl bg-[#ffffff0f] hover:bg-[#ffffff1f] backdrop-blur-xl transition-all duration-300 ease-in-out"
            onClick={props.onClick}
            disabled={props.disabled}
        >{props.label}</button>
    );
};