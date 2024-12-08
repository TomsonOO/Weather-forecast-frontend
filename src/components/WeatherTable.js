import WeatherIcon from './WeatherIcon';

export default function WeatherTable({ forecastData }) {
    return (
        <div className="overflow-x-auto mt-6">
            <table className="min-w-full table-auto text-sm text-left text-gray-800 dark:text-gray-100">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-100">
                <tr>
                    {forecastData.map((day, index) => (
                        <th key={index} scope="col" className="px-6 py-3">
                            {new Date(day.date).toLocaleDateString()} <WeatherIcon code={day.weatherCode} />
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                <tr>
                    {forecastData.map((day, index) => (
                        <td key={index} className="px-6 py-4 border-b dark:border-gray-600">
                            Max Temp: {day.maxTemp}°C<br />
                            Min Temp: {day.minTemp}°C<br />
                            Energy: {day.generatedEnergy.toFixed(3)} kWh
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
        </div>
    );
}
