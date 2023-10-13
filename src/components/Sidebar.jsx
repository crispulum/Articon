import React, {useState} from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => {
    
    
    const [username, setUsername] = useState("Username");
    const [clickedEmotion, setClickedEmotion] = useState("");
    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };


    const onClickEmotionsBtn = (emotion) => {
        

    }

    
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


