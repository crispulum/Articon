import React, {useState} from 'react';

import ImageGallery from './ImageGallery';
import Header from './Header';
import Sidebar from './Sidebar';

const Main = ({ handleEmotion, emotion }) => {
    
    return (
        <>
            <Header handleEmotion={handleEmotion} emotion={emotion}/>
            <div className="sidebar-main-container">
                <Sidebar handleEmotion={handleEmotion}/>
                <ImageGallery emotion={emotion} />    
            </div>
        </>
    )
}

export default Main;