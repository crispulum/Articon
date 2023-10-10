import Thumbnail from './Thumbnail';
import Lightbox from './Lightbox';
import React, { useState } from 'react';


const artArray = [
    {
        title: 'The Birth of Venus',
        artist: 'Sandro Botticelli',
        year: 1486,
        medium: 'tempera on canvas',
        url: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/The_Birth_of_Venus_%28Botticelli%29_1.jpg',
        score: 4,
        emotion: 'Happy',
        submitted_by: 'Binette',
    },
    {
        title: 'The Son of Man',
        artist: 'René Magritte',
        year: 1964,
        medium: 'oil on canvas',
        url: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Christian_Skredsvig_-_The_Son_of_Man_-_Menneskes%C3%B8nnen_-_Nasjonalmuseet_-_NG.M.00641.png',
        score: 5,
        emotion: 'Happy',
        submitted_by: 'Louis',
    },
    {
        title: 'The Lament for Icarus - Draper',
        artist: 'Herbert James Draper',
        year: 1898,
        medium: 'oil on canvas',
        url: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Herbert_Draper_-_The_Lament_for_Icarus_-_Google_Art_ProjectFXD.jpg',
        score: 0,
        emotion: 'Happy',
        submitted_by: 'Michael',
    },
    {
        title: 'The Scream',
        artist: 'Edward Munch',
        year: 1898,
        medium: 'oil on canvas',
        url: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg',
        score: 0,
        emotion: 'Happy',
        submitted_by: 'Michael',
    }
];

function ImageGallery() {
    const [selectedImage, setSelectedImage] = useState(null);
  
    const handleImageClick = (image) => {
      setSelectedImage(image);
    };
  
    const handleCloseLightbox = () => {
      setSelectedImage(null);
    };
  
    return (
      <div className="image-gallery">
        {artArray.map((image, index) => (
          <Thumbnail
            key={index}
            image={image}
            onClick={() => handleImageClick(image)}
          />
        ))}
        {selectedImage && <Lightbox image={selectedImage} onClose={handleCloseLightbox} />}
      </div>
    );
  }
  
  export default ImageGallery;
