import {City} from "../../types/City.ts";
import {useDispatch, useSelector} from "react-redux";
import {appendToCities, removeFromCities} from "../../slices/savedCitiesSlice.ts";
import {RootState} from "../../state/store.ts";
import {useNavigate} from "react-router";
import {Button} from "../Global/Button.tsx";

export type SearchItemProps = {item: City};

export const SearchItem = (props: SearchItemProps) => {
    const dispatch = useDispatch();
    const cities = useSelector((state: RootState)=> state.saved.cities);
    const navigate = useNavigate();

    return (
        <div
            className="flex justify-between align-center gap-3 w-full p-4 px-5 rounded-lg shadow-lg bg-transparent-100 backdrop-blur-xl"
            onClick={() => navigate(`/weather?lat=${props.item.lat}&lon=${props.item.lon}&fromSearch=true`)}
        >
            <span className="my-auto">{props.item.name}, {props.item.state && props.item.state+", "} {props.item.country}</span>
            {cities[props.item.id] ?
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