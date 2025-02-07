export const WeatherBox = (props: {label: string}) => {
    return (
        <>
            <div className="text-2xl font-light shadow dark:shadow-lg rounded p-4">{props.label}</div>
        </>
    );
};