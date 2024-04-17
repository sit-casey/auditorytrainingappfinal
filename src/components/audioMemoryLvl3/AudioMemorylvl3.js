
import React, { useState, useEffect } from 'react';
import classes from '../audioMemory/audioMemoryGame.module.css'; 
import { Link } from 'react-router-dom'; 
import NavProfile from "../../components/nav/Nav";
import BackgroundMusicSelector from "../backgroundMusic/backgroundMusic";


const words = [
  { word: 'Blaze', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2FRhyming%20Words%2FBlaze%201.wav?alt=media&token=0232973b-ab74-4536-aaaa-592f542dd1f3' },
  { word: 'Daze',  sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2FRhyming%20Words%2FDaze%201.wav?alt=media&token=eb3a31ed-4d9b-4603-9a2c-52e0ce176d52' },
  { word: 'Gaze',  sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2FRhyming%20Words%2FGaze%201.wav?alt=media&token=0fc6eac4-cb8f-4e69-892f-508892575575' },
  { word: 'Graze', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2FRhyming%20Words%2FGraze%201.wav?alt=media&token=6e450675-3fe7-4a57-90a6-f7160cb97ea2' },
  { word: 'Haze',  sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2FRhyming%20Words%2FHaze%201.wav?alt=media&token=ef8b4b40-80ee-4006-9045-1ff45fec4201' },
  { word: 'Laze',  sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2FRhyming%20Words%2FLaze%201.wav?alt=media&token=d2b3cd6a-2846-4f17-8971-450abcac7416' },
  { word: 'Maze',  sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2FRhyming%20Words%2FMaze%201.wav?alt=media&token=a72ec902-942b-4d7a-b013-9bbb98564390' },
  { word: 'Phase', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2FRhyming%20Words%2FPhase%201.wav?alt=media&token=d1aa17bb-6781-4d93-958a-857e431b53c4' },
  { word: 'Praise',sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2FRhyming%20Words%2FPraise%201.wav?alt=media&token=2c835c48-8de0-4bd1-bdeb-1c2229bc872b' },
  { word: 'Raise', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FAudio%20Memory%2FRhyming%20Words%2FRaise%201.wav?alt=media&token=48699e66-b7ce-4828-aa1c-fd7b81903571' },
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
