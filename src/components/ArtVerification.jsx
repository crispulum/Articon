import React, { useState, useEffect } from 'react';

function ArtVerification({ art, emotion, confirmArt, denyArt, onClose }) {

  //setting up this object format for the DB
  const [verificationData, setVerificationData] = useState({
    title: art.title || '',
    artist: art.artist || '',
    year: art.year || '',
    medium: art.medium || '',
    emotion: emotion || '',
  });

  const handleConfirm = () => {
    confirmArt(verificationData);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVerificationData({
      ...verificationData,
      [name]: value,
      submitted_by: art.submitted_by,
      thumbnailURL: art.thumbnailURL,
      url: art.url
    });
    console.log(verificationData)
  };

  useEffect(() => {
    setVerificationData({
      title: art.title || '',
      artist: art.artist || '',
      year: art.year || '',
      medium: art.medium || '',
      emotion: emotion || '',
    });
  }, [art, emotion]);

  return (
    <div className="lightbox">
      <div className="lightbox-content">
        <img src={art.thumbnailURL} alt={art.title} />

        <p>Was this the piece you were looking for?</p>
        <p>Title: {art.title}</p>
        <p>Artist: {art.artist}</p>

        <form>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={verificationData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="artist">Artist:</label>
            <input
              type="text"
              id="artist"
              name="artist"
              value={verificationData.artist}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="year">Year:</label>
            <input
              type="text"
              id="year"
              name="year"
              value={verificationData.year}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="medium">Medium:</label>
            <input
              type="text"
              id="medium"
              name="medium"
              value={verificationData.medium}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="emotion">Emotion:</label>
            <input
              type="text"
              id="emotion"
              name="emotion"
              value={verificationData.emotion}
              onChange={handleInputChange}
              required
            />
          </div>
        </form>

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
