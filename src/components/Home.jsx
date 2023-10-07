import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <div className="main-container">
                <h1>Welcome to Articon</h1>
                <input type="search" name="search" id="home-search-bar" 
                placeholder='How are you feeling today...?'/>
            </div>
        </div>
    )
}

export default Home;