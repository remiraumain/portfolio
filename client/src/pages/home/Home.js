import React from 'react';
import Header from '../../components/layout/Header';
import Projects from '../../components/Projects';
import About from '../../components/About';


function Home() {
    return (
        <div className={'Home'}>
            <Header/>
            <About/>
            <Projects/>
        </div>
    );
}

export default Home;