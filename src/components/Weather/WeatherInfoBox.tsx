export type WeatherInfoBoxProps = {label: string};

export const WeatherInfoBox = (props: WeatherInfoBoxProps) => {
    return (
        <div className="text-lg sm:text-2xl font-light shadow dark:shadow-lg rounded-lg p-4 bg-transparent-100 backdrop-blur-xl">{props.label}</div>
    );
};