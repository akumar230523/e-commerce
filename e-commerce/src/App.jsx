import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Footer from './components/Footer';
import ThemeContext from './context/Theme';

import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [isTheme, setIsTheme] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'light';
    });

    useEffect(() => {
        localStorage.setItem('theme', isTheme ? 'light' : 'dark');
        document.documentElement.classList.toggle('dark', isTheme);
    }, [isTheme]);

    return (
        <ThemeContext.Provider value={{ isTheme, setIsTheme }}>
            <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <Header />
                <main className="flex-grow pt-16">
                    <Outlet />
                </main>
                <Footer />
                <ToastContainer theme={isTheme ? 'light' : 'dark'} />
            </div>
        </ThemeContext.Provider>
    );

};

export default App;