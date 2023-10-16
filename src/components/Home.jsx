import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Home = ({ handleEmotion }) => {
    const [searchValue, setSearchValue] = useState('');

    const navigate = useNavigate();

    // these 2 functions navigate the user to either the signup page or login page
    const signupOnClick = (e) => {
        e.preventDefault();
        navigate("/signup")
    }
    const loginOnClick = (e) => {
        e.preventDefault();
        navigate("/login")
    }

    // sends the user to the main route
    // updates the emotion state initially found in LandingPages
    const handleSearch = () => {
        handleEmotion(searchValue);
        navigate('/main');
    };

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

  return (
    <div className="home">
      <div className="main-container">
        <h1>Welcome to Articon</h1>
        <input
          type="text"
          name="search"
          id="home-search-bar"
          placeholder="How are you feeling today...?"
          value={searchValue}
          onChange={handleInputChange}
        />
        <button className="search-btn-home" onClick={handleSearch}>Search</button>
        <div className="home-btn-container">
            <button className="login-btn-home" onClick={loginOnClick}>Login</button>
            <button className="signup-btn-home" onClick={signupOnClick}>Sign-Up</button> 
        </div>
      </div>
    </div>
  );
};
    

export default Home;