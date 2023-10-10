import React from 'react';

function Lightbox({ art, onClose }) {
  return (
    <div className="lightbox">
      <div className="lightbox-content">
        <img src={art.url} alt={art.title} loading="lazy"/>
        <div className="image-info">
          <h2>{art.title}</h2>
          <p>Artist: {art.artist}</p>
          <p>Year: {art.year}</p>
        </div>
        <button className="close-button" onClick={onClose}>X</button>
      </div>
    </div>
  );
}

export default Lightbox;
