import React, { useState } from 'react';
import SearchForm from './SearchForm'; // Assuming you have the SearchForm component

function AddArtComponent() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleFormSubmit = (formData) => {
    // Handle the form submission, e.g., make an API request
    // You can add the API request logic here, or point to a server route
    console.log('Form data submitted:', formData);
  };

  return (
    <div className='add-art-component'>
      <button onClick={toggleFormVisibility}>Add Art</button>
      {isFormVisible && (
        <SearchForm onSubmit={handleFormSubmit} />
      )}
    </div>
  );
}

export default AddArtComponent;
