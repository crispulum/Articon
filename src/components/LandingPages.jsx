import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Signup from './Signup.jsx';
import Main from './Main.jsx';

const LandingPages = () => {

    const [emotion, setEmotion] = useState("");

    const handleEmotion = (inputtedEmotion) => {
        setEmotion(inputtedEmotion)
    }
    
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home handleEmotion={handleEmotion}/>}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/main" element={<Main handleEmotion={handleEmotion} emotion={emotion}/>}></Route>
            </Routes>    
        </div>
    )
}

export default LandingPages;