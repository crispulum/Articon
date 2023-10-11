import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import ImageGallery from './ImageGallery';

const Main = () => {
    return (
        <div>
            <ImageGallery/>
            {/* 
            <Routes>
                // routes will go here when we start to make the main components of our website
                ex: <Route path="/main/happy" element={<Happy />}></Route>
            </Routes>     
            */}
        </div>
    )
}

export default Main;