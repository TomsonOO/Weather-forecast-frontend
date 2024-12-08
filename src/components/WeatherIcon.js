import { WiDaySunny, WiCloudy, WiRain } from 'react-icons/wi';

export default function WeatherIcon({ code }) {
    if (code >= 51) return <WiRain className="text-blue-500 text-3xl" />;
    if (code >= 3) return <WiCloudy className="text-gray-500 text-3xl" />;
    return <WiDaySunny className="text-yellow-400 text-3xl" />;
}
