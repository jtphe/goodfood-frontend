import React from 'react';
import Menu from './Menu';
import CurrentScreen from './CurrentScreen';

function Home(){
    return (
    <div className="flex flex-row">
        <Menu/>
        <CurrentScreen/>
    </div>
    )
}

export default Home;