import React, { useState, useEffect } from 'react';
import classes from './quizGame.module.css';
import { Link } from 'react-router-dom';
import NavProfile from "../nav/Nav";
import BackgroundMusicSelector from "../backgroundMusic/backgroundMusic";



const questions = [
  {
    question: "What color is the sky?",
    options: ["Red", "Yellow", "Blue", "Green"],
    answer: "Blue",
    audio:
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fcomprehensiongame%2FConverted%20by%20VirtualSpeech%20-%20cbajv13sg5.mp3?alt=media&token=ecacda7f-1290-48e2-85ea-cf15dc19b92f",
  },
  {
    question: "How many legs does a dog have?",
    options: ["One", "Two", "Three", "Four"],
    answer: "Four",
    audio:
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fcomprehensiongame%2FConverted%20by%20VirtualSpeech%20-%20he4gnb0s6u.mp3?alt=media&token=2ef9f0bd-798b-4391-bcee-fd836762a470",
  },
  {
    question: "What sound does the cat make?",
    options: ["Baa", "Meow", "Moo", "Squeak"],
    answer: "Meow",
    audio:
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fcomprehensiongame%2FConverted%20by%20VirtualSpeech%20-%20nle3iwx9bm.mp3?alt=media&token=1e6381a5-ef9d-49af-b82f-f2f6863cbc67",
  },
  {
    question: "Who gives us milk?",
    options: ["A cow", "A dog", "A mouse", "A snake"],
    answer: "A cow",
    audio:
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fcomprehensiongame%2F158e2178-ffb7-4516-b15b-35cb7ced88a9.m4a?alt=media&token=d1fdf755-71d3-42a1-8f7e-fa05eb432f38",
  },
  {
    question: "What do monkeys eat?",
    options: ["Peanuts", "Bananas", "Potatoes", "Tomatoes"],
    answer: "Bananas",
    audio:
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fcomprehensiongame%2FConverted%20by%20VirtualSpeech%20-%2068d1ow47zf.mp3?alt=media&token=50564c70-e5cc-44e8-8665-1336afb47c09",
  },
  {
    question: "Where do you go when you feel sick?",
    options: ["To school", "To the gym", "To the doctor", "To the dentist"],
    answer: "To the doctor",
    audio:
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fcomprehensiongame%2FConverted%20by%20VirtualSpeech%20-%20ls9uirovhz.mp3?alt=media&token=096b099d-ef35-44e1-bb98-d13d66fbfa0c",
  },
  {
    question: "What does a red light mean?",
    options: ["Go", "Stop", "Slow down", "Yield"],
    answer: "Stop",
    audio:
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fcomprehensiongame%2FConverted%20by%20VirtualSpeech%20-%20x5einbm14w.mp3?alt=media&token=fcb61d6a-83c8-43cf-beba-9527952e45a1",
  },
  {
    question: "What do you wear on your feet?",
    options: ["Shirt", "Pants", "Hat", "Shoes"],
    answer: "Shoes",
    audio:
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fcomprehensiongame%2FConverted%20by%20VirtualSpeech%20-%20anfpxb2j63.mp3?alt=media&token=60cd9e8a-614e-49e1-86d0-46747af8f5d8",
  },
  
];

function QuizGame() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('idle'); // 'idle', 'playing', 'completed'
  const [showQuestion, setShowQuestion] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Start game, reset state, and play first question's audio
  const handleStartGame = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameState('playing');
    setShowQuestion(false); // Ensure question is hidden at start
    playAudio(currentQuestionIndex);
  };

  // Handle answer selection
  const handleAnswer = (option) => {
    const isCorrect = option === questions[currentQuestionIndex].answer;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    // Move to the next question or end game
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setShowQuestion(false); // Hide question for next
      playAudio(nextQuestionIndex); // Play next audio
    } else {
      setGameState('completed');
    }
  };

  // Play audio
  const playAudio = (index) => {
    const audio = new Audio(questions[index].audio);
    audio.play();
  };

  // Toggle show/hide question based on hover and click
  const handleToggleQuestionVisibility = () => {
    if (isHovering) {
      setShowQuestion(!showQuestion);
    }
  };

  // Mouse enter and leave handlers
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <>
      <NavProfile />
      <div className={classes.gameContainer}>
      <BackgroundMusicSelector />
        <div className={classes.title}>Listen Carefully</div>
         {/* Display the score */}
      <div className={classes.scoreContainer}>
        Score: {score} / 8
      </div>
        {gameState === 'idle' && (
          <div className={classes.startButtonContainer}>
            <Link to="/activity/comprehension" style={{ textDecoration: 'none', color: 'gray', fontSize: '30px', fontFamily: "Google Sans,Roboto,Arial,sans-serif" ,  position: 'absolute', top: '10px', left: '10px' }}>
              X
            </Link>
            <button className={classes.startButton} onClick={handleStartGame}>
              Start Game
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <><>
           <Link to="/activity/comprehension" style={{ textDecoration: 'none', color: 'gray', fontSize: '30px', fontFamily: "Google Sans,Roboto,Arial,sans-serif" ,  position: 'absolute', top: '10px', left: '10px' }}>
              X
            </Link>

            {showQuestion && (
              <div className={classes.questionContainer}>
                <div className={classes.question}>
                  {questions[currentQuestionIndex].question}
                </div>
              </div>
            )}
            <div className={classes.wordsContainer}>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(option, index)} className={classes.wordButton}>
                  {option}
                </button>
              ))}
            </div>
          </><button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleToggleQuestionVisibility}
            className={classes.toggleButton}>
              Show Question
            </button></>
        )}
          
        {gameState === 'completed' && (
          <div className={classes.completedMessage}>
            Congratulations! You've completed the game!
            <Link to="/activity/comprehension" style={{ textDecoration: 'none', color: 'gray', fontSize: '30px', fontFamily: "Google Sans,Roboto,Arial,sans-serif" ,  position: 'absolute', top: '10px', left: '10px' }}>
              X
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default QuizGame;