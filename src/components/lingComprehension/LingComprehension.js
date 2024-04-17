import React, { useState, useEffect } from 'react';
import classes from './quizGame.module.css';
import { Link } from 'react-router-dom';
import NavProfile from "../../components/nav/Nav";
import BackgroundMusicSelector from "../backgroundMusic/backgroundMusic";


const questions = [
  {
    question: "What day is it?",
    options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    answer: "Monday",
    audio:
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fcomprehensiongame%2FConverted%20by%20VirtualSpeech%20-%20z5e6slw3fx.mp3?alt=media&token=30d5feed-3c34-455c-8e5d-176c4b932581",
  },
  {
    question: "What does Ali love?",
    options: ["Cookies", "Icecream", "Cake", "Candy"],
    answer: "Icecream",
    audio:
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fcomprehensiongame%2FConverted%20by%20VirtualSpeech%20-%20g539jltab0.mp3?alt=media&token=99677df4-3b52-4581-a74e-5f9f993bf20e",
  },
  {
    question: "What's the dog's name?",
    options: ["Twinkie", "Rover", "Max", "Kevin"],
    answer: "Rover",
    audio:
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fcomprehensiongame%2FConverted%20by%20VirtualSpeech%20-%203uvcjdeyg6.mp3?alt=media&token=1690b82d-45dc-4b85-96a5-d150811e57cf",
  },
  {
    question: "What did Marissa pack?",
    options: ["Clothes", "Toys", "Lunch", "Paper"],
    answer: "Lunch",
    audio:
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fcomprehensiongame%2FConverted%20by%20VirtualSpeech%20-%20ic6efh12rv.mp3?alt=media&token=ec5c69cb-3032-485c-bb3e-dcff9a10075c",
  },
  {
    question: "What is her favorite season?",
    options: ["Spring", "Summer", "Winter", "Fall"],
    answer: "Fall",
    audio:
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fcomprehensiongame%2F28c837a3-6858-4c8c-a0ab-c67dc2767b8c.m4a?alt=media&token=94633d8a-ed2c-4977-9f81-3a71680f1f21",
  },
  {
    question: "How are they traveling?",
    options: ["By car", "By train", "By airplane", "By boat"],
    answer: "By train",
    audio:
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fcomprehensiongame%2FConverted%20by%20VirtualSpeech%20-%20yxv4qkobrh.mp3?alt=media&token=e200128e-9530-4765-a98b-7ac3ddf5fc1e",
  },
  {
    question: "How many brothers does Paul have?",
    options: ["One", "Two", "Three", "None"],
    answer: "Two",
    audio:
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fcomprehensiongame%2FConverted%20by%20VirtualSpeech%20-%20p29i8ts7rj.mp3?alt=media&token=c5f7265a-f0a7-4ce6-b4ac-da71c242f8fd",
  },
  {
    question: "What kind of movies does Olivia watch?",
    options: ["Funny", "Serious", "Scary", "Romantic"],
    answer: "Scary",
    audio:
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fcomprehensiongame%2FConverted%20by%20VirtualSpeech%20-%20vk5o08ni2u.mp3?alt=media&token=e225ef5b-f449-4918-9a35-489ff19bb9c7",
  },
  {
    question: "What does the dog have?",
    options: ["A long tail", "A short tail", "A long nose", "A big nose"],
    answer: "A long tail",
    audio:
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fcomprehensiongame%2FConverted%20by%20VirtualSpeech%20-%20in1d8pxo4z.mp3?alt=media&token=912f814b-1493-47cb-93e5-643375749fce",
  },
  {
    question: "What color is the bear's bowtie?",
    options: ["Red", "Orange", "Pink", "Blue"],
    answer: "Blue",
    audio:
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fcomprehensiongame%2FConverted%20by%20VirtualSpeech%20-%209uiw27fqy6.mp3?alt=media&token=f5134228-ca78-4fdc-ba96-638ab35cc6e6",
  },
  {
    question: "What type of socks does the man have?",
    options: ["Silly", "Goofy", "Funky", "Ugly"],
    answer: "Funky",
    audio:
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fcomprehensiongame%2FConverted%20by%20VirtualSpeech%20-%205ytobfzn2x.mp3?alt=media&token=62595f85-e9cf-4e2b-a42d-f6f9bc59e0e2",
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
    const isCorrect = option === questions[currentQuestionIndex].answer;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
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




  return (
    <>
  <NavProfile />

    <div className={classes.gameContainer}>
    <BackgroundMusicSelector />

      <div className={classes.title}>Listen Carefully
      {gameState !== 'idle' && (
         <div className={classes.scoreContainer}>
         Score: {score} / 11
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
