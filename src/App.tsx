import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import {Weather} from "./pages/Weather.tsx";
import {PageNotFound} from "./pages/PageNotFound.tsx";
import {NavBar} from "./components/NavBar.tsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {setLatitude, setLongitude} from "./slices/locationSlice.ts";
import {Loading} from "./components/Loading.tsx";
import {Options} from "./pages/Options.tsx";
import {Search} from "./pages/Search.tsx";
import {enableMapSet} from "immer";
import {loadFromLocalStorage} from "./slices/savedSlice.ts";
import {setFlagsFromLocalStorage} from "./slices/flagsSlice.ts";
import {Saved} from "./pages/Saved.tsx";
import {RootState} from "./state/store.ts";
import { Background } from './components/Background.tsx';

function App() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const showBackground = useSelector((state: RootState) => state.flags.showBackground);

    useEffect(() => {
        enableMapSet();
        dispatch(loadFromLocalStorage());
        dispatch(setFlagsFromLocalStorage());
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
        <BrowserRouter>
            {showBackground && <Background />}
            {!loaded
                ? <Loading />
                : <>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<Weather/>} />
                        <Route path="/options" element={<Options/>} />
                        <Route path="/search" element={<Search/>} />
                        <Route path="/saved" element={<Saved/>} />
                        <Route path="/404" element={<PageNotFound/>} />
                        <Route path="*" element={<Navigate to="/404" replace />} />
                    </Routes>
                </>
            }
        </BrowserRouter>
      )
}

export default App
