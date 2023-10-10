import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Home = () => {
    // this is how we'll navigate to different emotion pages
   
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        if (searchValue === 'test') {
          navigate('/main');
     }
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
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};
    

export default Home;