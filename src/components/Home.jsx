import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Home = ({ handleEmotion }) => {
    // this is how we'll navigate to different emotion pages
   
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');

    const signupOnClick = (e) => {
        e.preventDefault();
        navigate("/signup")
    }
    const loginOnClick = (e) => {
        e.preventDefault();
        navigate("/login")
    }
    const handleSearch = () => {
        handleEmotion(searchValue);
    //     if (searchValue === 'test') {
    //       navigate('/main');
    //  }
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