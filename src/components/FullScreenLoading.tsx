import {Loading} from "./Loading.tsx";

export const FullScreenLoading = () => {
    return (
        <div className="text-center absolute w-screen h-screen py-32">
            <Loading />
        </div>
    );
};