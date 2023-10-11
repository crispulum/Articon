import React, { useState } from 'react';

function Lightbox({ art, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    const urlToCopy = art.url;

    // Create a new textarea element to temporarily hold the URL
    const textArea = document.createElement('textarea');
    textArea.value = urlToCopy;
    document.body.appendChild(textArea);

    // Select the text in the textarea
    textArea.select();

    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Remove the textarea element
    document.body.removeChild(textArea);

    // Set the copied state to true to show a message
    setCopied(true);
  };

  return (
    <div className="lightbox">
      <div className="lightbox-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <img src={art.url} alt={art.title} />
        <p>{art.title}</p>
        <p>{art.artist}</p>
        <p>{art.year}</p>
        <p>{art.medium}</p>

        <button onClick={handleCopyToClipboard}>
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>
    </div>
  );
}

export default Lightbox;
