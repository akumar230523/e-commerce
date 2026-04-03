import { createContext } from 'react';

const ThemeContext = createContext({
    isTheme: false,
    setIsTheme: () => { },
});

export default ThemeContext;