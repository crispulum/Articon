import React from 'react';

function Thumbnail({ art, onClick }) {
    return (
      <div className="thumbnail" onClick={onClick}>
        <img src={art.thumbnailURL} alt={art.title}/>
        <h3>{art.title}</h3>
      </div>
    );
  }
  
  export default Thumbnail;