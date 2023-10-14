import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import ImageGallery from './ImageGallery';
import Header from './Header';
import Sidebar from './Sidebar';

const Main = ({ handleEmotion, emotion }) => {
    
    return (
        <>
            <Header handleEmotion={handleEmotion}/>
            <div className="sidebar-main-container">
                <Sidebar handleEmotion={handleEmotion}/>
                <ImageGallery emotion={emotion} />    
            </div>
        </>
    )
}

export default Main;