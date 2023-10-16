import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Signup from './Signup.jsx';
import Main from './Main.jsx';

const LandingPages = () => {
    const [emotion, setEmotion] = useState(""); 
    // this emotion state is used in multiple components in main, such as displaying the emotion
    // and fetching the neccessary paintings

    const handleEmotion = (inputtedEmotion) => {
        // function passed down thru state to help us change the emotion
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

/**
 * So this page actually doesn't NEED to exist.
 * Our original vision for the front end had more routes so we thought it would be better to 
 * break up the routes depending on the components needed. For example, login and signup are pretty similar and 
 * use similar components so we would bundle their routes together in a seperate component. 
 * THEN we realized we didn't need as many routes as we thought and ended up with just these four routes...
 * I believed this could all be done in App.js and the webapp would work the same, but we ran out of time. 
 */