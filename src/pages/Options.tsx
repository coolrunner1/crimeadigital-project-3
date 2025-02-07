import {Checkbox} from "../components/Checkbox.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import {setShowFeelsLike, setShowHumidity, setShowPressure, setShowWind} from "../slices/flagsSlice.ts";

export const Options = () => {
    const flags = useSelector((state: RootState) => state.flags);
    const dispatch = useDispatch();

    return (
        <>
            <div className="h-svh flex">
                <div className="flex flex-col gap-10 items-center justify-center w-96 sm:w-2xl sm:p-12 sm:shadow sm:dark:shadow-lg sm:rounded-2xl m-auto">
                    <span className="font-bold text-4xl">Options</span>
                    <div className="flex flex-col gap-3 text-right w-96 p-4">
                        <Checkbox label={"Show perceived temperature"} checked={flags.showFeelsLike} onClick={() => {
                            dispatch(setShowFeelsLike(!flags.showFeelsLike));
                        }}/>
                        <Checkbox label={"Show wind speed"} checked={flags.showWind} onClick={() => {
                            dispatch(setShowWind(!flags.showWind));
                        }}/>
                        <Checkbox label={"Show atmospheric pressure"} checked={flags.showPressure} onClick={() => {
                            dispatch(setShowPressure(!flags.showPressure));
                        }}/>
                        <Checkbox label={"Show humidity"} checked={flags.showHumidity} onClick={() => {
                            dispatch(setShowHumidity(!flags.showHumidity));
                        }}/>
                    </div>
                </div>
            </div>
        </>
    );
};