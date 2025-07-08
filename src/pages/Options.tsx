import {ToggleButton} from "../components/Global/ToggleButton.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import {
    setDarkMode,
    setShowBackground,
    setShowDaytime,
    setShowFeelsLike,
    setShowHumidity,
    setShowPressure,
    setShowWind
} from "../slices/flagsSlice.ts";

export const Options = () => {
    const flags = useSelector((state: RootState) => state.flags);
    const dispatch = useDispatch();

    return (
        <div className="mt-[25px] sm:mt-0 sm:h-svh flex">
            <div className="flex flex-col gap-10 items-center justify-center w-96 sm:w-2xl sm:p-12 sm:shadow sm:dark:shadow-lg sm:rounded-2xl m-auto sm:backdrop-blur-xl z-99">
                <span className="font-bold text-4xl">Options</span>
                <div className="flex flex-col gap-3 text-right w-96 p-4">
                    <ToggleButton
                        label={"Show perceived temperature"}
                        checked={flags.showFeelsLike}
                        onChange={() => dispatch(setShowFeelsLike(!flags.showFeelsLike))}/>
                    <ToggleButton
                        label={"Show wind speed"}
                        checked={flags.showWind}
                        onChange={() => dispatch(setShowWind(!flags.showWind))}
                    />
                    <ToggleButton
                        label={"Show atmospheric pressure"}
                        checked={flags.showPressure}
                        onChange={() => dispatch(setShowPressure(!flags.showPressure))}
                    />
                    <ToggleButton
                        label={"Show humidity"}
                        checked={flags.showHumidity}
                        onChange={() => dispatch(setShowHumidity(!flags.showHumidity))}
                    />
                    <ToggleButton
                        label={"Show daytime"}
                        checked={flags.showDaytime}
                        onChange={() => dispatch(setShowDaytime(!flags.showDaytime))}
                    />
                    <ToggleButton
                        label={"Show background"}
                        checked={flags.showBackground}
                        onChange={() => dispatch(setShowBackground(!flags.showBackground))}/>
                    <ToggleButton
                        label={"Dark theme"}
                        checked={flags.darkMode}
                        onChange={() => dispatch(setDarkMode(!flags.darkMode))}
                    />
                </div>
            </div>
        </div>
    );
};