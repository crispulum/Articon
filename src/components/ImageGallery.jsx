import React, { useEffect, useState } from 'react';

import Thumbnail from './Thumbnail';
import Lightbox from './Lightbox';
import AddArtComponent from './AddArtComponent';
import SearchForm from './SearchForm';
import ArtVerification from './ArtVerification';


function ImageGallery() {

    const [artData, setArtData] = useState([]);
    const [artDetails, setArtDetails] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showSearchForm, setShowSearchForm] = useState(false);
    const [showArtVerification, setShowArtVerification] = useState(false);

  //populate page with appriopriate emotion
    useEffect(() => {
      fetch("/art/fetchArt/happy", {
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
            console.log(artData);
        });
    }, []);

    const handleImageClick = (image) => {
      setSelectedImage(image);
    };
    
    const handleCloseLightbox = () => {
      setSelectedImage(null);
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
            //had if statement for if the response returns the error object      
            // Set art details and show the ArtVerification
              setArtDetails(data);
              setShowSearchForm(false);
              setShowArtVerification(true);
          })
          .catch((error) => {
              console.error('Error submitting art:', error);
          });

      setShowSearchForm(false);
    }

    const confirmArt = (userInputData) => {
      // Use the userInputData in your logic
      console.log(userInputData);
  
      const { title, thumbnailURL, artist, year, medium, url, emotion, submitted_by } = userInputData;
      // submitted_by field should now be on the userInputData. You can add emotion as well.
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

      console.log(queryArtBody)

      fetch('/art/validateAndSave', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(queryArtBody),
    })
        .then(response =>{
          if (response.ok){
            console.log("successfully added art to the database")
          }
        })
        .catch((error) => {
            console.error('Error submitting art:', error);
        });

    }

    const handleCloseSearchForm = () => {
      setShowSearchForm(false);
    };

    const handleCloseArtVerification = () =>{
      setShowArtVerification(false);
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
            <button className="close-button" onClick={handleCloseSearchForm}>
              X
            </button>
            <SearchForm onSubmit={handleFormSubmit} onClose={handleCloseSearchForm} />
          </div>
        </div>
      )}
        {selectedImage && <Lightbox art={selectedImage} onClose={handleCloseLightbox} />}
        {showArtVerification && <ArtVerification 
        art={artDetails} 
        confirmArt={confirmArt}
        denyArt={handleDenyArtVerification}
        onClose={handleCloseArtVerification}
      />}
      </div>
    );
}
  
export default ImageGallery;

