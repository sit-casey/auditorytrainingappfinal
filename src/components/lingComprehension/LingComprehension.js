import React, { useState, useEffect } from 'react';
import classes from './quizGame.module.css';
import { Link } from 'react-router-dom';
import NavProfile from "../../components/nav/Nav";



const questions = [
  {
    question: 'What day is it?',
    options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    answer: 'Monday',
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%201%2FToday%20is%20Monday%201.wav?alt=media&token=aa9af13c-e0cf-45f1-964b-91aa5717d3b6',
  },
  {
    question: 'What does Ali love?',
    options: ['Cookies', 'Icecream', 'Cake', 'Candy'],
    answer: 'Icecream',
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%201%2FAli%20loves%20icecream%201.wav?alt=media&token=201b151d-4c51-4a0f-b180-c67f5fe7afb8',
  },

  {
    question: 'What is the dog\'s name?',
    options: ['Twinkie', 'Rover', 'Max', 'Kevin'],
    answer: 'Rover',
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%201%2FThe%20dog-s%20name%20is%20Rover%201.wav?alt=media&token=20c86b08-5846-4767-928a-378ad4882d2c',
  },
  {
    question: 'What did Melissa pack?',
    options: ['Clothes', 'Toys', 'Lunch', 'Papper'],
    answer: 'Lunch',
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%201%2FMarissa%20packed%20lunch%20for%201.wav?alt=media&token=a4d77dab-4c3b-4c9a-86bf-9865eb4f63ec',
  },
  {
    question: 'What is her favorite season?',
    options: ['Spring', 'Summer', 'Fall', 'Winter'],
    answer: 'Fall',
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%201%2FFall%20is%20her%20favorite%20seas%201.wav?alt=media&token=e89b7e17-ee35-4715-8176-912ed7fcac75',
  },
  {
    question: 'How are they traveling?',
    options: ['By Car', 'By Train', 'By Airplane', 'By Boat'],
    answer: 'By Train',
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%201%2FWe%20are%20traveling%20by%20train%201.wav?alt=media&token=815e38f7-c15f-4787-91a3-78f615fa41e8',
  },
  {
    question: 'How many brothers does Paul have?',
    options: ['One', 'Two', 'Three', 'None'],
    answer: 'Two',
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%201%2FPaul%20has%20two%20brothers%201.wav?alt=media&token=98c98fc5-3eaa-40d3-a544-6125898fa86e',
  },
  {
    question: 'What kind of movies Olivia watch?',
    options: ['Funny', 'Drama', 'Scary', 'Romantic'],
    answer: 'Scary',
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%201%2FOlivia%20watches%20scary%20movi%201.wav?alt=media&token=bb730273-2a22-4dee-8d98-3bca25c69fb5',
  },
  {
    question: 'What does the dog have?',
    options: ['A long tail', 'A short tail', 'A long nose', 'A big nose'],
    answer: 'A long tail',
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%201%2FThe%20dog%20has%20a%20long%20tail%201.wav?alt=media&token=2f867ba1-247d-486c-8980-39970259f85e',
  },
  {
    question: 'What color is the bear\'s bowtie',
    options: ['Red', 'Blue', 'Orange', 'Pink'],
    answer: 'Blue',
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%201%2FThe%20bear%20has%20a%20blue%20bow-t%201.wav?alt=media&token=de64898f-8ba3-4fee-8131-323e18a0d907',
  },
  {
    question: 'What type of socks does the man have',
    options: ['Silly', 'Goofy', 'Funky', 'Ugly'],
    answer: 'Funky',
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%201%2FThe%20man%20has%20funky%20socks%201.wav?alt=media&token=13bcbe0f-5300-438f-b33d-4af532c5f019',
  },
  
  
];

function QuizGame() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('idle'); // 'idle', 'playing', 'completed'
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  // Handle the start of the game and reset conditions
  const handleStartGame = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameState('playing');
    // Removed the direct playAudioQuestion call from here
  };

  // Handle answer selection
  const handleAnswer = (option, index) => {
    setSelectedOption(index);
    const isCorrect = option === questions[currentQuestionIndex].answer;
    setIsAnswerCorrect(isCorrect);
  
    if (isCorrect) {
      setScore(score + 1);
    }
  
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null); // Reset for the next question
        setIsAnswerCorrect(null); // Reset correctness state
      } else {
        setGameState('completed');
      }
    }, 2000); // Delay to show color change before moving to the next question
  };

  // UseEffect to handle audio playback
  useEffect(() => {
    if (gameState === 'playing') {
      const audio = new Audio(questions[currentQuestionIndex].audio);
      audio.play();
    }
  }, [currentQuestionIndex, gameState]); // Only trigger when these dependencies change

  // Calculate progress as a percentage
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;


  return (
    <>
  <NavProfile />
    <div className={classes.gameContainer}>
      <div className={classes.title}>Listen Carefully
      {gameState !== 'idle' && (
        <div className={classes.progressContainer}>
          <div className={classes.progressBar} style={{ width: `${progressPercentage}%` }}></div>
        </div>
      )}
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
        <>
          <Link to="/activity/comprehension" style={{ textDecoration: 'none', color: 'gray', fontSize: '30px', fontFamily: "Google Sans,Roboto,Arial,sans-serif" ,  position: 'absolute', top: '10px', left: '10px' }}>
            X
          </Link>
          <div className={classes.questionContainer}>
            <div className={classes.question}>
              {questions[currentQuestionIndex].question}
              </div>
              <div className={classes.wordsContainer}>
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <button key={index} onClick={() => handleAnswer(option)} className={classes.wordButton}>
                    {option}
                  </button>
              ))}
            </div>
          </div>
        </>
      )}

      {gameState === 'completed' && (
        
        <div className={classes.completedMessage}>
          
          <Link to="/activity/comprehension" style={{ textDecoration: 'none', color: 'gray', fontSize: '30px', fontFamily: "Google Sans,Roboto,Arial,sans-serif" ,  position: 'absolute', top: '10px', left: '10px' }}>
          X
          </Link>
          Congratulations! You've completed the game!
        </div>
      )}
    </div>
    </>
  );
}

export default QuizGame;
