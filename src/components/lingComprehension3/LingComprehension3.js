import React, { useState, useEffect } from 'react';
import classes from './quizGame.module.css';
import { Link } from 'react-router-dom';
import NavProfile from "../nav/Nav";



const sentences = [
  {
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%203%2FToday%20is%20my%20birthday%20and%203.wav?alt=media&token=6b910001-8e06-40c4-8135-9d2be7f70112',
    questions: [
      {
        question: 'Where did they go?',
        options: ['Shopping', 'Beach', 'Movies', 'Supermarket'],
        answer: 'Movies',
      },
      {
        question: 'Why did we go to the movies?',
        options: ['We were bored', 'It was raining', 'It was my birthday', 'It was his birthday'],
        answer: 'It was my birthday',
      },
      {
        question: 'What did they eat at the movies?',
        options: ['Popcorn', 'Hotdogs', 'Goobers', 'Gummi bears'],
        answer: 'Popcorn',
      },
      {
        question: 'Who did they go to the movies with?',
        options: ['Steve', 'Max', 'Jackie', 'Marc'],
        answer: 'Max',
      },
    ],
  },
  {
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%203%2FAmanda%20has%20soccer%20practic%202.wav?alt=media&token=33888cf7-655b-4112-921a-c0186fd915d5',
    questions: [
      {
        question: 'What sport does Amanda play?',
        options: ['Soccer', 'Softball', 'Volleyball', 'Basketball'],
        answer: 'Soccer',
      },
      {
        question: 'When does she have soccer practice?',
        options: ['Tomorrow', 'After school', 'Before school', 'On Thursday'],
        answer: 'After school',
      },
      {
        question: 'What did she forget for practice?',
        options: ['Her water bottle', 'Her shoes', 'Her uniform', 'Her knee pads'],
        answer: 'Her uniform',
      },
      {
        question: 'Where did she forget her uniform?',
        options: ['At home', 'At school', 'In her mom’s car', 'In her classroom'],
        answer: 'In her mom’s car',
      },
    ],
  },
  {
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%203%2FI%20need%20to%20change%20my%20appoi%202.wav?alt=media&token=52e53c26-c00c-4688-a04e-c81555f75593',
    questions: [
      {
        question: 'What do I need to do?',
        options: ['Take out the garbage', 'Change my appointment', 'Take a shower', 'Change the lightbulbs'],
        answer: 'Change my appointment',
      },
      {
        question: 'Why do I need to change my appointment?',
        options: ['I feel sick', 'The hairstylist canceled', 'I have another appointment', 'My car won’t start'],
        answer: 'I have another appointment',
      },
      {
        question: 'Who do I have another appointment with?',
        options: ['The doctor', 'The veterinarian', 'The accountant', 'The dentist'],
        answer: 'The dentist',
      },
    ],
  },
  {
    audio: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FComprehension%2FLevel%203%2FI%20have%20two%20dogs%20named%20Nol%201.wav?alt=media&token=887ea049-2666-490a-bb54-151dcfd02473',
    questions: [
      {
        question: 'How many dogs do they have?',
        options: ['One', 'Two', 'Three', 'Four'],
        answer: 'Two',
      },
      {
        question: 'Which dog has to go to the vet?',
        options: ['Max', 'Clyde', 'Nola', 'Duke'],
        answer: 'Clyde',
      },
      {
        question: 'Why does Clyde have to visit the vet?',
        options: ['Hurt his leg', 'Tummy issues', 'Toothache', 'Ear infection'],
        answer: 'Hurt his leg',
      },
    ],
  },

  
];


function QuizGame() {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('idle'); // 'idle', 'playing', 'completed'

  // Start game, reset state, and play first sentence's audio
  const handleStartGame = () => {
    setScore(0);
    setCurrentSentenceIndex(0);
    setCurrentQuestionIndex(0);
    setGameState('playing');
    playAudio(0);
  };

  // Handle answer selection
  const handleAnswer = (option) => {
    const currentSentence = sentences[currentSentenceIndex];
    const isCorrect = option === currentSentence.questions[currentQuestionIndex].answer;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex + 1 < currentSentence.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSentenceIndex + 1 < sentences.length) {
      setCurrentSentenceIndex(currentSentenceIndex + 1);
      setCurrentQuestionIndex(0);
      playAudio(currentSentenceIndex + 1);
    } else {
      setGameState('completed');
    }
  };

  // Play or replay audio
  const playAudio = (sentenceIndex) => {
    const audio = new Audio(sentences[sentenceIndex].audio);
    audio.play();
  };

  return (
    <>
      <NavProfile />
      <div className={classes.gameContainer}>
        <div className={classes.title}>Listen Carefully</div>
        <div className={classes.scoreContainer}>
          Score: {score} / {sentences.reduce((acc, sentence) => acc + sentence.questions.length, 0)}
        </div>
        {gameState === 'idle' && (
          <div className={classes.startButtonContainer}>
            <Link to="/activity/comprehension" style={{ textDecoration: 'none', color: 'gray', fontSize: '30px', fontFamily: "Google Sans,Roboto,Arial,sans-serif", position: 'absolute', top: '10px', left: '10px' }}>
              X
            </Link>
            <button className={classes.startButton} onClick={handleStartGame}>
              Start Game
            </button>
          </div>
        )}
        {gameState === 'playing' && (
          <>
            <Link to="/activity/comprehension" style={{ textDecoration: 'none', color: 'gray', fontSize: '30px', fontFamily: "Google Sans,Roboto,Arial,sans-serif", position: 'absolute', top: '10px', left: '10px' }}>
              X
            </Link>
            <div className={classes.questionContainer}>
              <div className={classes.question}>
                {sentences[currentSentenceIndex].questions[currentQuestionIndex].question}
              </div>
            </div>
            <div className={classes.wordsContainer}>
              {sentences[currentSentenceIndex].questions[currentQuestionIndex].options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(option)} className={classes.wordButton}>
                  {option}
                </button>
              ))}
            </div>
            <button onClick={() => playAudio(currentSentenceIndex)} className={classes.toggleButton}>
              Replay
            </button>
          </>
        )}
        {gameState === 'completed' && (
          <div className={classes.completedMessage}>
            Congratulations! You've completed the game!
            <Link to="/activity/comprehension" style={{ textDecoration: 'none', color: 'gray', fontSize: '30px', fontFamily: "Google Sans,Roboto,Arial,sans-serif", position: 'absolute', top: '10px', left: '10px' }}>
              X
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default QuizGame;