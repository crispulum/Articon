import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import SignOffLogInBtn from './SignOffLogInBtn.jsx';
import EmotionDisplay from './EmotionDisplay.jsx';

const Header = ({ handleEmotion, emotion }) => {
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight); // used to alter the viewportHeight depending on window size
    const [searchValue, setSearchValue] = useState("") // used in search bar

    const navigate = useNavigate();
    const logoOnClick = () => {
        // navigates the user to the root directory when clicking the 'logo' in the top left corner of the page.
        // Root serves the Home component
        navigate('/')
    }

    useEffect(() => {
      // For when I used viewportHeight in CSS to help deal with the resizing of the window
      const handleResize = () => {
        setViewportHeight(window.innerHeight);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const handleSearch = () => {
        // Takes the emotion typed into the search bar and updates state.
        // handleEmotion initially comes from LandingPages.jsx 
        handleEmotion(searchValue);
    };

    const handleInputChange = (event) => {
        // Helps update searchValue state when the user types in the search bar
        setSearchValue(event.target.value);
    };

    const search = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Call the search function
            handleSearch();
        }
    }

    return(
        <>
        <header className='header' style={{ height: `${viewportHeight * 0.08}px` }} >
            <div className="header-logo-container">
                    <button className="logo-btn" onClick={logoOnClick}>Articon</button>
            </div>
            <nav style={{ height: `${viewportHeight * 0.08}px` }}>
                <ul className='nav-ul ul-left'>
                    <li>
                        <input
                            type="text"
                            name="search"
                            className="main-search-bar"
                            placeholder="Search for more emotions!"
                            onKeyPress={search}
                            onChange={handleInputChange}
                        />
                    </li>
                    <li>
                        <EmotionDisplay emotion={emotion} />
                    </li>
                </ul>
                <ul className="nav-ul ul-right">
                    <li>
                        <button className='signOffLogInBtn'>
                           <Link to="https://github.com/Articon-scratch-project/Articon/blob/main/README.md" className='Link'>About</Link> 
                        </button>
                    </li>
                    <li>
                        <button className='signOffLogInBtn'>
                            <Link className='Link'>Settings</Link>
                        </button>
                    </li>
                    <li>
                        <SignOffLogInBtn />
                    </li>
                </ul>
            </nav>
        </header>
        </>
    )
    
}

export default Header;