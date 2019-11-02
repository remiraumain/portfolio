import React, { useState, useLayoutEffect } from 'react';

const ThemeContext = React.createContext({
    dark: false,
    toggle: () => {},
});

export default ThemeContext;

export function ThemeProvider (props) {
    // keeps state of the current theme
    const [dark, setDark] = useState(false);

    // paints the app before it renders elements
    useLayoutEffect(() => {
        const lastTheme = window.localStorage.getItem('darkTheme');

        if (lastTheme === 'true') {
            setDark(true);
            applyTheme(darkTheme);
        } else {
            setDark(false);
            applyTheme(lightTheme);
        }
        // if state changes, repaints the app
    }, [dark]);

    // rewrites set of css variablels/colors
    const applyTheme = theme => {
        const root = document.getElementsByTagName('html')[0];
        root.style.cssText = theme.join(';');
    };

    const toggle = () => {
        const body = document.getElementsByTagName('body')[0];
        body.style.cssText = 'transition: background .2s ease';

        setDark(!dark);
        window.localStorage.setItem('darkTheme', !dark);
    };

    return (
        <ThemeContext.Provider value={{
            dark,
            toggle,
        }}>
            {props.children}
        </ThemeContext.Provider>
    )
}


// styles
const lightTheme = [
    '--border: rgba(0,0,0,.2)',
    '--shadow: #000',
    '--heading: rgba(254, 69, 68, .9)',//#000
    '--main: black',
    '--text: #000',
    '--textAlt: #fff',
    '--inactive: rgba(0,0,0,.3)',
    '--background: white',
    '--scroll: #c1c1c1',
    '--scrollActive: rgba(254, 69, 68, .9)',//#818181
];

const darkTheme = [
    '--border: rgba(255,255,255,.1)',
    '--shadow: #000',
    '--heading: rgba(255,255,5,.9)',
    '--main: white',
    '--text: rgb(255, 255, 255)',
    '--textAlt: #fff',
    '--inactive: rgba(255,255,255,.3)',
    '--background: black',
    '--scroll: #505050',
    '--scrollActive: rgba(255,255,5,.9)',//#3b3b3b
];


