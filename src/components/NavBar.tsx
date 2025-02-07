import {useNavigate} from "react-router";

export const NavBar = () => {
    const navigate = useNavigate();

    return (
        <>
            <header className="flex flex-row justify-evenly shadow p-5 sm:pr-10 sm:pl-10 lg:pr-20 lg:pl-20 absolute z-40 w-screen">
                <button onClick={() => navigate("/")}>Weather</button>
                <button onClick={() => navigate("/search")}>Search</button>
                <button onClick={() => navigate("/options")}>Options</button>
            </header>
        </>
    );
};