import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import {Weather} from "./pages/Weather.tsx";
import {PageNotFound} from "./pages/PageNotFound.tsx";
import {NavBar} from "./components/NavBar/NavBar.tsx";
import {Options} from "./pages/Options.tsx";
import {Search} from "./pages/Search.tsx";
import {Saved} from "./pages/Saved.tsx";
import {FullScreenLoading} from "./components/Global/FullScreenLoading.tsx";
import { Home } from './pages/Home.tsx';
import {useInitializeApplication} from "./hooks/useInitializeApplication.ts";

function App() {
    const loaded = useInitializeApplication();

    return (
        <BrowserRouter>
            {!loaded
                ? <FullScreenLoading/>
                : <>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/weather" element={<Weather/>} />
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
