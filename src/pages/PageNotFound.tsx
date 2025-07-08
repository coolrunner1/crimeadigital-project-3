import {useNavigate} from "react-router";
import {Button} from "../components/Global/Button.tsx";

export const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full px-16 md:px-0 h-screen flex items-center justify-center">
            <div
                className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl backdrop-blur-xl">
                <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider">404</p>
                <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider mt-4">Page Not
                    Found</p>
                <p className="text-white my-4 pb-4 border-b-2 text-center">Sorry, the page you are looking for
                    could not be found.</p>
                <Button
                    label={"Return Home"}
                    onClick={() => navigate("/")}
                />
            </div>
        </div>
    );
};