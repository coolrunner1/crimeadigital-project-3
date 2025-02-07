import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import {Weather} from "./pages/Weather.tsx";
import {PageNotFound} from "./pages/PageNotFound.tsx";
import {NavBar} from "./components/NavBar.tsx";
import {useEffect, useState} from "react";
import {useDispatch} from 'react-redux';
import {setLatitude, setLongitude} from "./slices/locationSlice.ts";
import {Loading} from "./pages/Loading.tsx";
import {Options} from "./pages/Options.tsx";
import {Search} from "./pages/Search.tsx";
import {enableMapSet} from "immer";

function App() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        enableMapSet();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                dispatch(setLatitude(position.coords.latitude));
                dispatch(setLongitude(position.coords.longitude));
                setLoaded(true);
            },(error) => {
                console.error(error);
                setLoaded(true);
            });
        } else {
            console.log("Geolocation not supported");
            setLoaded(true);
        }
    }, []);

    return (
        <>
            <BrowserRouter>
                    {!loaded
                        ? <Loading />
                        : <>
                            <NavBar/>
                            <Routes>
                                <Route path="/" element={<Weather/>} />
                                <Route path="/options" element={<Options/>} />
                                <Route path="/search" element={<Search/>} />
                                <Route path="/404" element={<PageNotFound/>} />
                                <Route path="*" element={<Navigate to="/404" replace />} />
                            </Routes>
                        </>
                    }
            </BrowserRouter>
        </>
      )
}

export default App
