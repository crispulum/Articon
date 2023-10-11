import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Signup from './Signup.jsx';

const LandingPages = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
            </Routes>    
        </div>
    )
}

export default LandingPages;