import {useSelector} from "react-redux";
import {RootState} from "../../state/store.ts";
import {WeatherInfoBoxLoadingPlaceholder} from "./WeatherInfoBoxLoadingPlaceholder.tsx";

export const WeatherForecastLoadingPlaceholder = () => {
    const flags = useSelector((state: RootState) => state.flags);

    return (
        <>
            <div className="bg-transparent-100 p-5 w-58 animate-pulse"></div>
            <div className="bg-transparent-100 p-5 w-30 animate-pulse"></div>
            {flags.showFeelsLike &&
                <div className="bg-transparent-100 p-3 w-40 animate-pulse"></div>
            }
            <div className="rounded-full p-8 sm:p-10 bg-transparent-100 animate-pulse"></div>
            <span className="w-20 p-4 bg-transparent-100 animate-pulse"></span>
            <span className="w-24 p-3 bg-transparent-100 animate-pulse"></span>
            <div className={
                (flags.showWind && flags.showHumidity && flags.showPressure && flags.showDaytime)
                    ? "grid grid-rows-4 grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-2 sm:gap-4 mt-5"
                    : "flex flex-col gap-3 mt-5"}>
                {flags.showWind &&
                    <WeatherInfoBoxLoadingPlaceholder/>
                }
                {flags.showPressure &&
                    <WeatherInfoBoxLoadingPlaceholder/>
                }
                {flags.showHumidity &&
                    <WeatherInfoBoxLoadingPlaceholder/>
                }
                {flags.showDaytime &&
                    <WeatherInfoBoxLoadingPlaceholder/>
                }
            </div>
        </>
    );
};