
import React, { useState, useEffect } from 'react';
import classes from '../audioMemory/audioMemoryGame.module.css'; 
import { Link } from 'react-router-dom'; 
import NavProfile from "../../components/nav/Nav";
 
const words = [
  { word: 'God', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2FGod%201.wav?alt=media&token=721d0683-ab1a-49ce-bac7-00f94e5881bf' },
  { word: 'Bat', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2Fbat%201%20(1).wav?alt=media&token=d98be82e-a496-4f70-84ea-cfcde2f54870' },
  { word: 'Bit', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2Fbit%201.wav?alt=media&token=3130a2ae-0698-42c4-80d8-0558e7557192' },
  { word: 'But', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2Fbut%201.wav?alt=media&token=bc6adddc-b07b-424e-b0b2-8206096b126d' },
  { word: 'Chip', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2Fchip%202.wav?alt=media&token=16968ac5-422c-4968-adb2-6f8841b4a17d' },
  { word: 'Fan', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2Ffan%201.wav?alt=media&token=1f742901-3fef-4812-ba2a-e6f9ae01c053' },
  { word: 'Man', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2Fman%201.wav?alt=media&token=e216c141-57ae-4782-a8f0-81947f46414d' },
  { word: 'Pat', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2Fpat%201.wav?alt=media&token=61ec3f63-9672-44f4-b549-cf94107df121' },
  { word: 'Two', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2Ftwo%201.wav?alt=media&token=f98f94bd-fce2-4243-96be-01837457bccd' },
  { word: 'Ship', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2Fship%201%20(1).wav?alt=media&token=1da7a1a2-0e1e-4835-90ec-1342bfc0827a' },
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