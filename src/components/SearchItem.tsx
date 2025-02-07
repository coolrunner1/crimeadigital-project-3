import {City} from "../types/City.ts";
import {useDispatch} from "react-redux";
import {appendToCities, removeFromCities} from "../slices/savedSlice.ts";

export const SearchItem = (props: {item: City, key: number, cities: Map<string, City>}) => {
    const dispatch = useDispatch();

    return (
        <>
            <div className="flex justify-between align-center gap-3 w-full p-4 rounded-lg shadow" key={props.key}>
                <span className="m-auto">{props.item.name}, {props.item.state && props.item.state+", "} {props.item.country}</span>
                {props.cities.get(`${props.item.lat}${props.item.lon}`)
                    ? <button onClick={() => dispatch(removeFromCities(props.item))}>Remove</button>
                    : <button onClick={() => dispatch(appendToCities(props.item))}>Add</button>}
            </div>
        </>
    );
};