import React from 'react';

function MessageBox({ message, onClose }) {

  //this works by setting the message in the parent ImageGallery component, then passing it into this component
      return (
        <div className="lightbox">
          <div className="lightbox-content">
           <p>{message}</p>
            <button onClick={onClose}>Ok</button>
          </div>
        </div>
      );
    }
    

export default MessageBox;


