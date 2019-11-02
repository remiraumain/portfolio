import React from 'react';
import './App.css';
import Home from './pages/home/Home';
import Cursor from "./components/Cursor";

function App() {
    return (
        <div className="App">
            <Cursor/>
            <Home/>
        </div>
    );
}

export default App;