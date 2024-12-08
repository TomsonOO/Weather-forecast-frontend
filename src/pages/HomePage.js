import React, { useState, useEffect } from 'react';
import useDarkMode from '../hooks/useDarkMode';
import useGeolocation from '../hooks/useGeolocation';
import useWeatherData from '../hooks/useWeatherData';
import WeatherTable from '../components/WeatherTable';
import WeeklySummary from '../components/WeeklySummary';
import MapSelector from '../components/MapSelector';

export default function HomePage() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const { latitude: geoLat, longitude: geoLon, loading: geoLoading, error: geoError } = useGeolocation();

    const [selectedLat, setSelectedLat] = useState(null);
    const [selectedLon, setSelectedLon] = useState(null);

    useEffect(() => {
        if (geoLat !== null && geoLon !== null && selectedLat === null && selectedLon === null) {
            setSelectedLat(geoLat);
            setSelectedLon(geoLon);
        }
    }, [geoLat, geoLon, selectedLat, selectedLon]);

    const { forecastData, summaryData, loading: dataLoading, error: dataError } = useWeatherData(selectedLat, selectedLon);

    const isLoading = geoLoading || dataLoading;
    const error = geoError || dataError;

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen bg-gradient-to-b from-blue-500 via-blue-300 to-blue-500 flex flex-col items-center justify-start p-8`}>
            <div className="container mx-auto px-6 py-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                    <h1 className="text-2xl font-bold dark:text-gray-100 mb-4 md:mb-0">7-Day Weather Forecast</h1>
                    <button
                        onClick={toggleDarkMode}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                    >
                        Toggle Dark Mode
                    </button>
                </div>

                {isLoading && <p className="text-center dark:text-gray-100">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {!isLoading && !error && forecastData && <WeatherTable forecastData={forecastData} />}
                {!isLoading && !error && summaryData && <WeeklySummary summaryData={summaryData} />}

                <MapSelector onLocationSelected={(lat, lon) => {
                    setSelectedLat(lat);
                    setSelectedLon(lon);
                }} />
            </div>
        </div>
    );
}
