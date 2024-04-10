import React, { useState, useEffect } from 'react';
import classes from './quizGame.module.css';
import { Link } from 'react-router-dom';
import NavProfile from "../nav/Nav";



const questions = [
  {
    question: 'What color is the sky?',
    options: ['Red', 'Yellow', 'Blue', 'Green'],
    answer: 'Blue',
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%202%2FWhat%20color%20is%20the%20sky%202.wav?alt=media&token=ec054409-b261-4481-9d09-1cba41cd39de',
  },
  {
    question: 'How many legs does a dog have?',
    options: ['One', 'Two', 'Five', 'Four'],
    answer: 'Four',
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%202%2FHow%20many%20legs%20does%20a%20dog%201.wav?alt=media&token=642125d8-7500-43be-8850-dc5c1ff66d76',
  },

  {
    question: 'What sound does the cat say?',
    options: ['Baa', 'Moo', 'Meow', 'Squeak'],
    answer: 'Meow',
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%202%2FWhat%20sound%20does%20the%20cat%201.wav?alt=media&token=9454fe9d-67ac-49fa-817a-1b099ac14af1',
  },
  {
    question: 'Who gives us milk?',
    options: ['A cow', 'A dog', 'A moose', 'A snake'],
    answer: 'A cow',
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%202%2FWho%20gives%20us%20milk%201.wav?alt=media&token=0c324a59-83a1-47fe-b5a6-a4df880da0e1',
  },
  {
    question: 'What do monkeys eat',
    options: ['Carrots', 'Bananas', 'Potatos', 'Peanuts'],
    answer: 'Bananas',
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%202%2FWhat%20do%20monkeys%20eat%201.wav?alt=media&token=266890ce-10ca-4e47-b5e3-13d53a6b29f4',
  },
  {
    question: 'Where do you go when you feel sick?',
    options: ['The Mechanic', 'The Gym', 'The Dentist', 'The Doctor'],
    answer: 'The Doctor',
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%202%2FWhere%20do%20you%20go%20when%20you%201.wav?alt=media&token=d7fc810e-2dcc-426b-b059-91b21730dcf6',
  },
  {
    question: 'What does a red light mean?',
    options: ['Stop', 'Go', 'Slow Down', 'Yeild'],
    answer: 'Stop',
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%202%2FWhat%20does%20a%20red%20light%20me%202.wav?alt=media&token=504af6cb-7efe-4415-ac11-0ded051ed872',
  },
  {
    question: 'What do you wear on your feet?',
    options: ['Shirt', 'Shoes', 'Pants', 'Hat'],
    answer: 'Shoes',
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%202%2FWhat%20do%20you%20wear%20on%20your%201.wav?alt=media&token=ac89040d-4c94-47d4-814c-ab1a36eaebf2',
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