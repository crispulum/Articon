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
      fetch('/art/fetchArt/happy', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
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
            console.log(data)
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

    const confirmArt = (newArtData) =>{
      console.log(newArtData)

      fetch('/validateAndSave', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArtData),
    })
        .then((data) => {
          setShowArtLightbox(false)
        })
        .catch((error) => {
            console.error('Error submitting art:', error);
        });

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

