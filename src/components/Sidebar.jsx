import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
 import Cookies from 'js-cookie';

const Sidebar = ({ handleEmotion }) => {
    const [username, setUsername] = useState("");

    const onClickEmotionsBtn = (emotion) => {
        handleEmotion(emotion)
    }

    useEffect(() => {
        // Check if the "username" cookie exists
        if (Cookies.get('username')) {
            // The "username" cookie exists, and you can access its value like this:
            const sentUsername = Cookies.get('username');
            setUsername(sentUsername);
        } 
        else {
            // The "username" cookie doesn't exist
            console.log('Username cookie not found.');
        }
    },[username])
    
    return(
        <>  
            <div className="sidebar">
                <ul className="sidebar-emotions-ul">
                    <li>
                        <button className='emotions-btn angry' onClick={() => onClickEmotionsBtn('angry')}>
                            Angry
                        </button>
                    </li>
                    <li>
                        <button className='emotions-btn happy' onClick={() => onClickEmotionsBtn('happy')}>
                            Happy
                        </button>
                    </li>
                    <li>
                        <button className='emotions-btn sad' onClick={() => onClickEmotionsBtn('sad')}>
                            Sad
                        </button>
                    </li>
                    <li>
                        <button className='emotions-btn surprised' onClick={() => onClickEmotionsBtn('surprised')}>
                            Surprised
                        </button>
                    </li>
                    <li>
                        <button className='emotions-btn disgusted' onClick={() => onClickEmotionsBtn('disgusted')}>
                            Disgusted
                        </button>
                    </li>
                    <li>
                        <button className='emotions-btn fearful' onClick={() => onClickEmotionsBtn('fearful')}>
                            Fearful
                        </button>
                    </li>
                    <li>
                        <button className='emotions-btn bad' onClick={() => onClickEmotionsBtn('bad')}>
                            Bad
                        </button>
                    </li>
                    <li className='username-li-item'>
                        {username}
                    </li>
                </ul>
                
            </div>
        </>
    )
}

export default Sidebar;


