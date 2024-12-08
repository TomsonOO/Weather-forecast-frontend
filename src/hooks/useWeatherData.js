import { useState, useEffect } from 'react';

async function fetchForecastData(latitude, longitude) {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/weather/forecast?latitude=${latitude}&longitude=${longitude}`);
    if (!response.ok) throw new Error('Failed to fetch forecast data');
    return response.json();
}

async function fetchSummaryData(latitude, longitude) {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/weather/summary?latitude=${latitude}&longitude=${longitude}`);
    if (!response.ok) throw new Error('Failed to fetch summary data');
    return response.json();
}

export default function useWeatherData(latitude, longitude) {
    const [forecastData, setForecastData] = useState(null);
    const [summaryData, setSummaryData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (latitude === null || longitude === null) return;

        setLoading(true);
        setError(null);

        Promise.all([
            fetchForecastData(latitude, longitude),
            fetchSummaryData(latitude, longitude)
        ]).then(([forecast, summary]) => {
            setForecastData(forecast);
            setSummaryData(summary);
        }).catch(err => {
            setError(err.message);
        }).finally(() => {
            setLoading(false);
        });
    }, [latitude, longitude]);

    return { forecastData, summaryData, loading, error };
}
