import React from 'react';

function Lightbox({ image, onClose }) {
  return (
    <div className="lightbox">
      <div className="lightbox-content">
        <img src={image.url} alt={image.title} />
        <div className="image-info">
          <h2>{image.title}</h2>
          <p>Artist: {image.artist}</p>
          <p>Year: {image.year}</p>
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Lightbox;
