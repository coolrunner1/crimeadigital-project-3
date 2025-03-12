import {City} from "../types/City.ts";
import {useDispatch, useSelector} from "react-redux";
import {appendToCities, removeFromCities} from "../slices/savedSlice.ts";
import {RootState} from "../state/store.ts";
import {useNavigate} from "react-router";

export const SearchItem = (props: {item: City}) => {
    const dispatch = useDispatch();
    const cities = useSelector((state: RootState)=> state.saved.cities);
    const navigate = useNavigate();

    return (
        <div className="flex justify-between align-center gap-3 w-full p-4 rounded-lg shadow"
             onClick={() => navigate(`/?lat=${props.item.lat}&lon=${props.item.lon}`)}>
            <span className="m-auto">{props.item.name}, {props.item.state && props.item.state+", "} {props.item.country}</span>
            {cities.get(`${props.item.lat}${props.item.lon}`)
                ? <button onClick={(e) =>
                    {dispatch(removeFromCities(props.item)); e.stopPropagation();}}
                >Remove</button>
                : <button onClick={(e) =>
                    {dispatch(appendToCities(props.item)); e.stopPropagation();}}
                >Add</button>}
        </div>
    );
};