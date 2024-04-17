
import React, { useState, useEffect } from 'react';
import classes from '../audioMemory/audioMemoryGame.module.css'; 
import { Link } from 'react-router-dom'; 
import NavProfile from "../../components/nav/Nav";
import BackgroundMusicSelector from "../backgroundMusic/backgroundMusic";


const words = [
  { word: 'Bite', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2FRhyming%20Monosyllabic%20Words%2FBite%202.wav?alt=media&token=874b0512-2731-49f0-b0e5-0b802f39a25a' },
  { word: 'Fight', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2FRhyming%20Monosyllabic%20Words%2FFight%201.wav?alt=media&token=41659a1a-baed-448c-9916-184067c54838' },
  { word: 'Flight', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2FRhyming%20Monosyllabic%20Words%2FFlight%201.wav?alt=media&token=e160674b-5c76-496b-aaed-6fbf3a3f48e5' },
  { word: 'White', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2FRhyming%20Monosyllabic%20Words%2Fwhite%201.wav?alt=media&token=77d4bf58-555f-468e-b233-85c3f7acd834' },
  { word: 'Light', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2FRhyming%20Monosyllabic%20Words%2FLight%201.wav?alt=media&token=69cc1cb1-23d3-4240-9e23-54d713eb12cc' },
  { word: 'Might', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2FRhyming%20Monosyllabic%20Words%2FMight%201.wav?alt=media&token=f8f008c1-4a51-4558-a2d8-39312c409d9f' },
  { word: 'Night', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2FRhyming%20Monosyllabic%20Words%2FNight%201.wav?alt=media&token=d673caf4-2b21-4621-a948-315b4313a123' },
  { word: 'Right', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2FRhyming%20Monosyllabic%20Words%2FRight%201.wav?alt=media&token=70017456-2680-43d6-a753-8e8f862d2073' },
  { word: 'Sight', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2FRhyming%20Monosyllabic%20Words%2FSight%201.wav?alt=media&token=610b6808-c14e-4587-921e-70add2b94d97' },
  { word: 'Tight', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2FRhyming%20Monosyllabic%20Words%2FTight%201.wav?alt=media&token=35932cdb-48b4-43cc-87b5-8a68b13f10eb' },
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
  <BackgroundMusicSelector />

  <div className={classes.title}>Repeat The Pattern</div>

  {/* Display the score */}
  <div className={classes.scoreContainer}>
    Score: {score}
  </div>

  {gameState === 'idle' && (
    <div className={classes.startButtonContainer}>
      <Link to="/activity/gameActivities/audioMemoryGame" style={{ textDecoration: 'none', color: 'gray', fontSize: '30px', fontFamily: "Google Sans,Roboto,Arial,sans-serif" ,  position: 'absolute', top: '10px', left: '10px' }}>
        X
      </Link>
      <button className={classes.startButton} onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  )}

  {(gameState === 'ready' || gameState === 'waitingForInput') && (
    <div className={classes.wordsContainer}>
      <Link to="/activity/gameActivities/audioMemoryGame" style={{ textDecoration: 'none', color: 'gray', fontSize: '30px', fontFamily: "Google Sans,Roboto,Arial,sans-serif" ,  position: 'absolute', top: '10px', left: '10px' }}>
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