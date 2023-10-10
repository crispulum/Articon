import React from 'react';

function Thumbnail({ image, onClick }) {
    return (
      <div className="thumbnail" onClick={onClick}>
        <img src={image.url} alt={image.title} />
        <h3>{image.title}</h3>
      </div>
    );
  }
  
  export default Thumbnail;