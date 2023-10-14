import React from 'react';

function MessageBox({ message, onClose}) {

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


