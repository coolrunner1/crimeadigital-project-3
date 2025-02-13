import {MouseEventHandler} from "react";

export const Checkbox = (props:
                         {label: string; onClick: MouseEventHandler<HTMLInputElement>; checked: boolean}) => {
    return (
        <label className="flex gap-3">
            <input type="checkbox" checked={props.checked} onClick={props.onClick}/>
            {props.label}
        </label>
    );
};