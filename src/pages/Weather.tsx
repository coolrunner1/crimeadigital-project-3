import {useCallback, useEffect, useRef, useState} from "react";
import {useNavigate, useSearchParams} from "react-router";
import {Button} from "../components/Global/Button.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchWeather} from "../api/weather.ts";
import {Loading} from "../components/Global/Loading.tsx";
import {WeatherForecast} from "../components/Weather/WeatherForecast.tsx";
import { WeatherContainer } from "../components/Weather/WeatherContainer.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../state/store.ts";

export const Weather = () => {
    const [searchParams] = useSearchParams();

    const search = useRef<string | null>(null)
    const latitude = useRef<number | null>(null);
    const longitude = useRef<number | null>(null);
    const fromSearch = useRef(searchParams.get("fromSearch") === "true");
    const location = useSelector((state: RootState) => state.location);
    const [allowRequest, setAllowRequest] = useState(false);

    const queryStringEntered = searchParams.toString().length > 0;

    const navigate = useNavigate();

    const {
        data: forecast,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["weather", search.current, latitude.current, longitude.current],
        queryFn: fetchWeather,
        enabled: allowRequest,
        refetchInterval: 300000,
    })

    const changeCity = async () => {
        setAllowRequest(false);
        if (queryStringEntered) {
            longitude.current = Number(searchParams.get("lon"));
            latitude.current = Number(searchParams.get("lat"));
            search.current = searchParams.get("q");
            setAllowRequest(true);
            return;
        }
        if (location.latitude === 0 && location.longitude === 0) {
            longitude.current = null;
            latitude.current = null;
        } else {
            latitude.current = location.latitude;
            longitude.current = location.longitude;
        }
        setAllowRequest(true);
    };

    const getBackButton = useCallback(() => {
        if (fromSearch.current) {
            return (
                <Button
                    onClick={() => navigate(-1)}
                    label={"Back"}
                />
            )
        } else {
            return (
                <Button
                    onClick={() => navigate("/")}
                    label={"Home"}
                />
            )
        }
    }, [navigate, fromSearch]);

    useEffect(() => {
        changeCity();
    }, [queryStringEntered]);

    return (
        <>
            <div className="sm:h-svh flex mt-[25px] sm:mt-0">
                <WeatherContainer>
                    {isLoading && <div className="my-50"><Loading/></div>}
                    {error && <div className="text-2xl font-bold">{error.message}</div>}
                    {!isLoading && !isError && forecast && <>
                        <WeatherForecast forecast={forecast} />
                        {getBackButton()}
                    </>}
                </WeatherContainer>
            </div>
        </>
    );
};