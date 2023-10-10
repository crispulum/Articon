import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Home = () => {
    // this is how we'll navigate to different emotion pages
    const navigate = useNavigate();
    
    const signupOnClick = (e) => {
        e.preventDefault();
        navigate("/signup")
    }
    const loginOnClick = (e) => {
        e.preventDefault();
        navigate("/login")
    }

    
    return (
        <div className="home">
            <div className="main-container">
                <h1>Welcome to Articon</h1>
                <input type="search" name="search" id="home-search-bar" 
                placeholder='How are you feeling today...?'/>
                <button className="login-btn-home" onClick={loginOnClick}>Login</button>
                <button className="signup-btn-home" onClick={signupOnClick}>Sign-Up</button>
            </div>
        </div>
    )
}
export default Home;