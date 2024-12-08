export default function WeeklySummary({ summaryData }) {
    return (
        <footer className="mt-6 p-4 border-t border-gray-300 dark:border-gray-600">
            <h2 className="text-lg font-semibold dark:text-gray-100 mb-4">Weekly Summary</h2>
            <div className="text-gray-800 dark:text-gray-100 space-y-1">
                <div>Lowest Temp: {summaryData.lowestTemperature}°C</div>
                <div>Highest Temp: {summaryData.highestTemperature}°C</div>
                <div>Average Pressure: {summaryData.averagePressure.toFixed(2)} hPa</div>
                <div>Average Sun Exposure: {summaryData.averageSunExposure.toFixed(2)} h</div>
                <div>Summary: {summaryData.weatherSummary}</div>
            </div>
        </footer>
    );
}