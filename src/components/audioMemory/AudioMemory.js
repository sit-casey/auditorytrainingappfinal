
//----------
import React, { useState, useEffect } from 'react';
import classes from './audioMemoryGame.module.css'; 
import { Link } from 'react-router-dom'; 
import NavProfile from "../../components/nav/Nav";


// Original words array
const words = [
  { word: 'Happy', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2FHappy.mp3?alt=media&token=fca0b375-84bd-4b12-9712-500db4bc63dc' },
  { word: 'Perfect', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2FPerfect.mp3?alt=media&token=214876cc-72df-4464-93e9-164b02018d49' },
  { word: 'Joyful', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2FJoyful.mp3?alt=media&token=ce3458b4-ecb8-43f1-a7cd-5cc9c5cc5d1d' },
  { word: 'Thirsty', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2FThirsty.mp3?alt=media&token=83fe212d-edf1-4127-8a41-00a7e6720ff6' },
  { word: 'Awkward', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2FAwkward.mp3?alt=media&token=f85a3c58-c551-45f3-8d7f-7bf700b14c5f' },
  { word: 'Tender', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2FTender.mp3?alt=media&token=06499e8d-def1-496d-8618-7ab23d1d3d58' },
  { word: 'Heavy', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2FHeavy.mp3?alt=media&token=a8225edf-b7d8-4ccc-8c98-cbf476257988' },
  { word: 'Standard', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2FStandard.mp3?alt=media&token=8bd37cea-4af6-44ea-90e9-62d00f7f8b80' },
  { word: 'Thankful', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2FThankful.mp3?alt=media&token=707e9fdc-3e71-43d9-9ca3-2e216e80abde' },
  { word: 'Common', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2FCommon.mp3?alt=media&token=c962443f-c99d-4693-8bcc-2d221fee17ab' },
];

// Preload audio files into an array of objects
const preloadedWords = words.map(word => ({
  ...word,
  audio: new Audio(word.sound) // Preloading the audio file
}));

function AudioMemoryGame() {

  const [showSequence, setShowSequence] = useState(false); // New state for showing/hiding the sequence
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [gameState, setGameState] = useState('idle');
  const [score, setScore] = useState(0); // Initialize score state 
  const [isHovering, setIsHovering] = useState(false);


// Adjust the handleShowSequence to check both "isHovering" and "showSequence"
const handleShowSequence = () => {
  if (isHovering) setShowSequence(true);
};  

// Function to hide the sequence
const handleHideSequence = () => {
  setShowSequence(false);
};
// Event handlers for mouse enter and leave to set the hover state
const handleMouseEnter = () => {
  setIsHovering(true);
};
const handleMouseLeave = () => {
  setIsHovering(false);
  setShowSequence(false); // Also hide sequence when mouse leaves the button
};

// Function to play sound, returns a promise that resolves when the sound finishes playing
const playSound = (soundUrl) => {
  return new Promise((resolve, reject) => {
    const sound = new Audio(soundUrl);
    sound.onended = resolve;
    sound.onerror = reject;
    sound.play().catch(reject);
  });
};

// Function to play the sequence of sounds without waiting for user input in between
const playSequence = async () => {
  setGameState('playing');
  for (let i = 0; i < sequence.length; i++) {
    await playSound(sequence[i].sound);
  }
  setGameState('ready');
};

// Function to generate the next word in the sequence
const addWordToSequence = () => {
  let availableWords = words.filter(word => !sequence.map(seqWord => seqWord.word).includes(word.word));
  if (availableWords.length === 0) {
    setGameState('completed'); // No more words to add, so the game is completed
    return;
  }
  const randomIndex = Math.floor(Math.random() * availableWords.length);
  setSequence(prevSequence => [...prevSequence, availableWords[randomIndex]]);
};

// Function to handle user selection
const handleUserInput = (word) => {
  if (gameState !== 'ready' && gameState !== 'waitingForInput') return;
  setUserInput(prevInput => [...prevInput, word]);
  setGameState('waitingForInput');
};

// Check sequence when user input is complete

useEffect(() => {
 
    if (gameState === 'waitingForInput' && userInput.length === sequence.length) {
      const isCorrect = sequence.every((item, index) => item.word === userInput[index]);
      
        if (isCorrect) {
          
            setScore((prevScore) => prevScore + 10); // Update score 
            setUserInput([]);
            addWordToSequence();
            setGameState('ready');
          
            
      } else {
          alert('Incorrect sequence, try again!');
          setUserInput([]);
          setGameState('ready');
      }
    }
}, [userInput, gameState, sequence]);
// Function to replay the sequence without changing game states or scores
const replaySequence = () => {
  if (sequence.length > 0 && (gameState === 'ready' || gameState === 'waitingForInput')) {
    playSequence();
  }
};
// Button to start game
const handleStartGame = () => {
  if (gameState === 'idle' || gameState === 'ready') {
    setScore(0);
    setSequence([]);
    setUserInput([]);
    addWordToSequence();
  } else {
    playSequence();
  }
  setGameState('ready');
};

useEffect(() => {
  if (gameState === 'ready' && sequence.length > 0) {
    playSequence();
  }
}, [sequence]);


return (
  <>
      <NavProfile />
      <div className={classes.gameContainer}>
      <div className={classes.title}>Repeat The Pattern</div>

      {/* Display the score */}
      <div className={classes.scoreContainer}>
        Score: {score}
      </div>

      {gameState === 'idle' && (
        <div className={classes.startButtonContainer}>
          <Link to="/activity/gameActivities/audioMemoryGame" style={{ textDecoration: 'none', color: 'gray', fontSize: '30px', fontFamily: "Google Sans", position: 'absolute', top: '10px', left: '10px' }}>
            X
          </Link>
          <button className={classes.startButton} onClick={handleStartGame}>
            Start Game
          </button>
        </div>
      )}

      {(gameState === 'ready' || gameState === 'waitingForInput') && (
        <div className={classes.wordsContainer}>
          <Link to="/activity/gameActivities/audioMemoryGame" style={{ textDecoration: 'none', color: 'gray', fontSize: '30px', fontFamily: "Google Sans" ,  position: 'absolute', top: '10px', left: '10px' }}>
            X
          </Link>
          
          {words.map((word, index) => (
            <button
              key={index}
              onClick={() => handleUserInput(word.word)}
              className={classes.wordButton}
            >
              {word.word}
            </button>
          ))}
        </div>
      )}

      {/* Button to display the sequence */}
      {(gameState === 'ready' || gameState === 'waitingForInput') && sequence.length > 0 && (
        <div className={classes.buttonsContainer}>
        {sequence.length > 0 && (
          <>
            <button
              className={classes.sequenceButton}
              onMouseDown={handleShowSequence}
              onMouseUp={handleHideSequence}
              onMouseEnter={handleMouseEnter} // Hover
              onMouseLeave={handleMouseLeave} // Hover
              onTouchStart={handleShowSequence} // For touch devices
              onTouchEnd={handleHideSequence} // For touch devices
            >
              Show Sequence
            </button>
            <button className={classes.replayButton} onClick={replaySequence}>
              Replay Sequence
            </button>
          </>
        )}
      </div>
      )}

      {/* Displaying the sequence text if showSequence is true */}
    
      {showSequence && (
        <div className={classes.sequenceDisplay}>
          {sequence.map((item, index) => (
            <span key={index} className={classes.sequenceItem}>
              {item.word} 
            </span>
          ))}
        </div>
      )}

      {gameState === 'completed' && (
        <div className={classes.completedMessage}>Congratulations! You've completed the game!</div>
      )}
      

    </div>
  
  </>
  
);

}

export default AudioMemoryGame;