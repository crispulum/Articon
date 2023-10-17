import React, {useEffect, useState} from 'react';


const EmotionDisplay = ({emotion}) => {
    /**
     * This component is for displaying the current emotion that is being focused
     * on for the main page.
     */
    const [displayedEmotion, setDisplayedEmotion] = useState('happy');
    
    useEffect(() => {
       setDisplayedEmotion(emotion.charAt(0).toUpperCase() + emotion.slice(1));
    }, [emotion])

    return(
        <>
            <h3>{displayedEmotion}</h3>
        </>
    )
}

export default EmotionDisplay;