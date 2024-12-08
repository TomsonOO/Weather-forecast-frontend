import { useState, useEffect } from 'react';

export default function useGeolocation() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by this browser.');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            position => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setLoading(false);
            },
            err => {
                setError('Unable to retrieve your location.');
                setLoading(false);
            }
        );
    }, []);

    return { latitude, longitude, loading, error };
}
