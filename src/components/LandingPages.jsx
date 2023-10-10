import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from "./Home.jsx"


const LandingPages = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                {/* 
                Placeholder for future routes
                <Route path="/login" element={tbd}></Route>
                <Route path="/signup" elemtn={tbd}></Route> */}
            </Routes>    
        </div>
    )
}

export default LandingPages;