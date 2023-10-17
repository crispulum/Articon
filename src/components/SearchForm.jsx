import React, { useState } from 'react';

function SearchForm({ onSubmit, onClose }) {


  const [formData, setFormData] = useState({
    artist: '',
    title: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData); 
  
    onClose(); 
  };
  

  return (
    <div className='search-form'>
      <p>What piece of art were you looking for?</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Artwork Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            required
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="artist">Artist:</label>
          <input
            type="text"
            id="artist"
            name="artist"
            value={formData.artist}
            required
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchForm;
