import React from 'react';

function ArtVerification({ art, confirmArt, denyArt, onClose }) {

  const handleConfirm = () => {
    confirmArt(art);
  };


  return (
    <div className="lightbox">
      <div className="lightbox-content">
        <img src={art.thumbnailURL} alt={art.title} />

        <p>Was this the piece you were looking for?</p>
        <p>Title: {art.title}</p>
        <p>Artist: {art.artist}</p>

        <button className="confirm-button" onClick={handleConfirm}>
          Confirm
        </button>
        <button className="deny-button" onClick={denyArt}>
          Deny
        </button>
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}

export default ArtVerification;