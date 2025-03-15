import {City} from "../types/City.ts";
import {useDispatch, useSelector} from "react-redux";
import {appendToCities, removeFromCities} from "../slices/savedSlice.ts";
import {RootState} from "../state/store.ts";
import {useNavigate} from "react-router";
import {Button} from "./Button.tsx";

export const SearchItem = (props: {item: City}) => {
    const dispatch = useDispatch();
    const cities = useSelector((state: RootState)=> state.saved.cities);
    const navigate = useNavigate();

    return (
        <div className="flex justify-between align-center gap-3 w-full p-4 px-5 rounded-lg shadow-lg bg-[#ffffff0f] backdrop-blur-xl"
             onClick={() => navigate(`/?lat=${props.item.lat}&lon=${props.item.lon}`)}>
            <span className="my-auto">{props.item.name}, {props.item.state && props.item.state+", "} {props.item.country}</span>
            {cities.get(`${props.item.lat}${props.item.lon}`) ?
                <Button
                    label={"Remove"}
                    onClick={(e) => {
                        dispatch(removeFromCities(props.item));
                        e.stopPropagation();
                    }}
                /> :
                <Button
                label={"Add"}
                onClick={(e) => {
                    dispatch(appendToCities(props.item));
                    e.stopPropagation();
                }}
            />}
        </div>
    );
};