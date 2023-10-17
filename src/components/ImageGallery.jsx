import React, { useEffect, useState } from 'react';

import Thumbnail from './Thumbnail';
import Lightbox from './Lightbox';
import SearchForm from './SearchForm';
import ArtVerification from './ArtVerification';
import MessageBox from './MessageBox'

function ImageGallery({ emotion }) {

  //these states have to do with getting data and passing it to the other componenters
  const [artData, setArtData] = useState([]);
  const [artDetails, setArtDetails] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  /*
  - setting a message to send to the messagebox component. 
  - you can sent whatever message as a function in this ImageGallery parent component
  */
  const [message, setMessage] = useState('');

  //if these states get set to true, the components in their lines will appear
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showArtVerification, setShowArtVerification] = useState(false);
  const [showMessageBox, setShowMessageBox] = useState(false);

  //closing any boxes client side
  const handleCloseAll = () =>{
    setShowSearchForm(false);
    setShowArtVerification(false);
    setSelectedImage(null);
    setShowMessageBox(false);
  }
  
  //populate page with appropriate emotion
    useEffect(() => {
      fetch(`/art/fetchArt/${emotion}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setArtData(data);
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
            const unAuthorized = "Unauthorized"
            //The following code is janky... but it works lol

            //if the API can't find that piece
            if (data.err === errorMessage) {
              setShowSearchForm(false);
              setMessage(`We're having trouble finding that piece... Want to try again?`);
              setShowMessageBox(true);

              //handle if the user isn't logged in
            } else if (data.message === unAuthorized) {
              setShowSearchForm(false);
              setMessage(`Please sign in to upload new art`);
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

      //the current DB will only accept an input as an object that follows this format:
      //note: url, thumbnailURL and submitted_by properties get added to the queryArtBody object in the middleware route
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
          else {
            setMessage('The artwork Title, Artist and Emotion inputs are required. Please try again.');
            handleCloseAll();
            setShowMessageBox(true);
          }
          })
        .catch((error) => {
            console.error('Error submitting art:', error);
            setMessage('There was an error submitting this to the database. Please try again.');
            handleCloseAll();
            setShowMessageBox(true);
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
          emotion={emotion}
          confirmArt={confirmArt}
          denyArt={handleDenyArtVerification}
          onClose={handleCloseAll}
      />}

    {showMessageBox && <MessageBox message={message} onClose={handleCloseAll} />}

    </div>
    );
}
  
export default ImageGallery;



