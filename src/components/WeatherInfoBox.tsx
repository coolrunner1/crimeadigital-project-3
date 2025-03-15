export const WeatherInfoBox = (props: {label: string}) => {
    return (
        <div className="text-lg sm:text-2xl font-light shadow dark:shadow-lg rounded-lg p-4 bg-[#ffffff0f] backdrop-blur-xl">{props.label}</div>
    );
};