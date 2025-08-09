import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Theme from './context/Theme';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {

    const[isTheme, setIsTheme] = useState(false);

    return (
        <Theme.Provider value={{ isTheme, setIsTheme }}>
            <div className={isTheme ? 'dark' : 'light'}>
                <Header />
                <main className="pages">
                    <Outlet />
                </main>
                <Footer />
                <ToastContainer theme={isTheme ? 'dark' : 'light'} />
            </div>
        </Theme.Provider>
    );
  
}

export default App;



