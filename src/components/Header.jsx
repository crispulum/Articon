import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import SignOffLogInBtn from './SignOffLogInBtn.jsx';
import Sidebar from './Sidebar.jsx';

const Header = () => {
    const navigate = useNavigate();
    const logoOnClick = () => {
        navigate('/')
    }

    //---
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

    useEffect(() => {
      // Update the viewportHeight whenever the window is resized
      const handleResize = () => {
        setViewportHeight(window.innerHeight);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    //--- 



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
                            // value={searchValue}
                            // onChange={handleInputChange}
                        />
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
        <div className="sidebar-main-container">
            <Sidebar />
            <div className="dummy-main">

            </div>
        </div>
        </>
    )
}




export default Header;