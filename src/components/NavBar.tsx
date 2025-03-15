import {useNavigate} from "react-router";
import "./NavBar.css";
import {NavBarButton} from "./NavBarButton.tsx";

export const NavBar = () => {
    const navigate = useNavigate();

    const goToWeather = () => {
        if (location.pathname === "/" && location.search) {
            navigate("/404");
            setTimeout(() => navigate("/"), 30);
            return;
        }
        navigate("/");
    }

    return (
        <header className="shadow p-5 pb-0 pt-3 sm:px-10 lg:px-20 z-40 w-screen navbar backdrop-blur-xl">
            <div className="flex flex-row justify-evenly m-auto max-w-6xl">
                <NavBarButton label={"Weather"} onClick={goToWeather} />
                <NavBarButton label={"Search"} onClick={() => navigate("/search")} />
                <NavBarButton label={"Saved"} onClick={() => navigate("/saved")} />
                <NavBarButton label={"Options"} onClick={() => navigate("/options")} />
            </div>
        </header>
    );
};