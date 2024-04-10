import React, { useEffect, useState } from 'react';

import Thumbnail from './Thumbnail';
import Lightbox from './Lightbox';
import SearchForm from './SearchForm';
import ArtVerification from './ArtVerification';
import MessageBox from './MessageBox'

function ImageGallery({ emotion }) {

  const [artData, setArtData] = useState([]);
  const [artDetails, setArtDetails] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showArtVerification, setShowArtVerification] = useState(false);

  //state for populating and showing the message box
  const [message, setMessage] = useState('');
  const [showMessageBox, setShowMessageBox] = useState(false);

  //closing any boxes client side
  const handleCloseAll = () =>{
    setShowSearchForm(false);
    setShowArtVerification(false);
    setSelectedImage(null);
    setShowMessageBox(false);
  }
  
  //populate page with appriopriate emotion
    useEffect(() => {
      fetch(`/art/fetchArt/${emotion}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log('data fetched!')
          console.log(response)
            return response.json()
        })
        .then((data) => {
          console.log('data fetched!')
            setArtData(data);
            console.log('is artData')
            console.log(artData)
        });
    }, [emotion]);

    const handleImageClick = (image) => {
      setSelectedImage(image);
    };

    const handleAddArtClick = () => {
      setShowSearchForm(true);
    };
    
    const handleFormSubmit = (formData) => {
      // Send a POST request to /art/submitArt with formData
      fetch('/art/submitArt', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      })
          .then((response) => response.json())
          .then((data) => {
            const errorMessage = "Error - wikimedia article not found";
    
            if (data.err === errorMessage) {
              setShowSearchForm(false);
              setMessage(`We're having trouble finding that piece... Want to try again?`);
              setShowMessageBox(true);
            } else {
              // Set art details and show the ArtVerification
              setArtDetails(data);
              setShowSearchForm(false);
              setShowArtVerification(true);
            }
          })
          .catch((error) => {
              console.error('Error submitting art:', error);
          });

      setShowSearchForm(false);
    }

    const confirmArt = (userInputData) => {

      const { title, thumbnailURL, artist, year, medium, url, emotion, submitted_by } = userInputData;

      const queryArtBody = {
        validatedArtObject: {
          title: title,
          artist: artist,
          year: year,
          medium: medium,
          thumbnailURL: thumbnailURL,
          url: url,
          emotion: emotion,
          submitted_by: submitted_by
        }
      }

      fetch('/art/validateAndSave', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(queryArtBody),
    })
      .then(response => {
          if (response.ok){
              console.log('successfully added art to the database');
              setMessage('Art was successfully added');
              handleCloseAll();
              setShowMessageBox(true);
          }
          })
        .catch((error) => {
            console.error('Error submitting art:', error);
        });

    }

    const handleDenyArtVerification = () =>{
      setShowArtVerification(false);
      setShowSearchForm(true)
    }

    return (
      <div className="image-gallery">
        {artData.map((art, index) => (
          <Thumbnail key={index} art={art} onClick={() => handleImageClick(art)} />
        ))}

        <button className="add-art-button" onClick={handleAddArtClick}>
          Add Art
        </button>

        {showSearchForm && (
        <div className="lightbox">
          <div className="lightbox-content">
            <button className="close-button" onClick={handleCloseAll}>
              X
            </button>
            <SearchForm onSubmit={handleFormSubmit} onClose={handleCloseAll} />
          </div>
        </div>
      )}

        {selectedImage && <Lightbox art={selectedImage} onClose={handleCloseAll} />}

        {showArtVerification && <ArtVerification 
          art={artDetails} 
          confirmArt={confirmArt}
          denyArt={handleDenyArtVerification}
          onClose={handleCloseAll}
      />}

    {showMessageBox && <MessageBox message={message} onClose={handleCloseAll} />}

    </div>
    );
}
  
export default ImageGallery;


