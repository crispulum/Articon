import React, { useState } from 'react';

function SearchForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    artist: '',
    title: '',
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
  };

  return (
    <div className='search-form'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="artist">Artist:</label>
          <input
            type="text"
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="title">Artwork Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchForm;
