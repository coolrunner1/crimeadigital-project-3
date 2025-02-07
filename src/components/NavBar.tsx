import {useNavigate} from "react-router";
import "./NavBar.css";

export const NavBar = () => {
    const navigate = useNavigate();

    return (
        <>
            <header className="flex flex-row justify-evenly shadow p-5 sm:pr-10 sm:pl-10 lg:pr-20 lg:pl-20 z-40 w-screen navbar">
                <button onClick={() => navigate("/")}>Weather</button>
                <button onClick={() => navigate("/search")}>Search</button>
                <button onClick={() => navigate("/options")}>Options</button>
            </header>
        </>
    );
};