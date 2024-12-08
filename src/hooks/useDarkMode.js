import { useEffect, useState } from 'react';

const THEME_KEY = 'theme';

export default function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window === 'undefined') return false;
        return localStorage.getItem(THEME_KEY) === 'dark';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem(THEME_KEY, 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem(THEME_KEY, 'light');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    return { isDarkMode, toggleDarkMode };
}
