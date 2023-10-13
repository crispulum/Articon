import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import ImageGallery from './ImageGallery';
import Header from './Header';
import Sidebar from './Sidebar';

const Main = () => {
    return (
        <>
            <Header />
            <div className="sidebar-main-container">
                <Sidebar />
                <ImageGallery />    
            </div>
        </>
    )
}

export default Main;