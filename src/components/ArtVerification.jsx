import React, { useState } from 'react';

function ArtVerification({ art, onClose }) {
  const [copied, setCopied] = useState(false);
  const [score, setScore] = useState(art.score)

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

  const handleVote = (voteType) => {

    const voteData = {
      id: art._id,
      score: voteType,
    };

  fetch('/art/vote', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(voteData),
  })
    .then((response) => {
          if (response.ok) {
            response.json()
            .then((data) => {
              setScore(data);
            });
          } else {
            console.error('Vote request failed:', response.statusText);
        }
    })
    .catch((error) => {
        console.error('Error sending vote request:', error);
    });
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
        <p>Score: {score}</p>
        <p>Submitted by: {art.submitted_by}</p>
        <button onClick={() => handleVote(+1)}>↑</button>
        <button onClick={() => handleVote(-1)}>↓</button>

        <button onClick={handleCopyToClipboard}>
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>
    </div>
  );
}

export default ArtVerification;
