import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const words = [
  "CAT", "DOG", "FISH", "BIRD", "HORSE", "RABBIT", "TIGER", "ELEPHANT", "MONKEY", "LION"
];

const CategoryGame = () => {
  const [selectedLetters, setSelectedLetters] = useState(Array(100).fill(false));
  const [foundWords, setFoundWords] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [turn, setTurn] = useState(1); // Player 1 starts
  const [speechRecognition, setSpeechRecognition] = useState(null);

  const puzzle = [
    'C', 'V', 'A', 'F', 'X', 'K', 'E', 'S', 'G', 'J',
    'Z', 'G', 'B', 'C', 'C', 'F', 'N', 'M', 'U', 'J',
    'T', 'E', 'V', 'J', 'K', 'X', 'K', 'A', 'D', 'I',
    'R', 'B', 'W', 'K', 'C', 'Q', 'J', 'Y', 'B', 'B',
    'S', 'G', 'Q', 'Y', 'F', 'G', 'V', 'G', 'X', 'P',
    'M', 'R', 'O', 'D', 'S', 'N', 'J', 'O', 'G', 'N',
    'J', 'F', 'Y', 'C', 'H', 'A', 'I', 'R', 'C', 'U',
    'T', 'H', 'L', 'U', 'C', 'C', 'A', 'B', 'W', 'J',
    'J', 'B', 'V', 'G', 'H', 'E', 'J', 'W', 'H', 'S',
    'K', 'H', 'M', 'Y', 'Y', 'H', 'I', 'B', 'B', 'W',
    'Q', 'E', 'L', 'V', 'A', 'E', 'G', 'M', 'V', 'X',
    'W', 'Q', 'D', 'B', 'O', 'Z', 'R', 'O', 'H', 'K',
    'F', 'R', 'W', 'J', 'I', 'R', 'E', 'B', 'E', 'N',
    'M', 'B', 'B', 'C', 'Q', 'M', 'P', 'W', 'H', 'F',
    'W', 'O', 'H', 'N', 'M', 'Q', 'M', 'S', 'I', 'R',
    'Z', 'X', 'R', 'O', 'S', 'N', 'L', 'Q', 'D', 'N',
    'E', 'R', 'O', 'S', 'P', 'R', 'A', 'C', 'E', 'R',
    'Y', 'R', 'S', 'W', 'J', 'P', 'A', 'L', 'O', 'Q',
    'S', 'C', 'R', 'T', 'F', 'Y', 'I', 'X', 'H', 'B',
    'T', 'F', 'L', 'B', 'J', 'K', 'N', 'H', 'O', 'S',
    'B', 'N', 'K', 'Y', 'P', 'E', 'W', 'L', 'G', 'A',
    'A', 'H', 'Z', 'O', 'S', 'H', 'E', 'H', 'R', 'E',
    'X', 'A', 'S', 'B', 'N', 'R', 'P', 'W', 'C', 'T',
    'I', 'L', 'D', 'Y', 'M', 'T', 'H', 'D', 'M', 'G',
    'G', 'E', 'S', 'Y', 'M', 'O', 'I', 'S', 'I', 'I',
    'O', 'R', 'L', 'A', 'T', 'Y', 'M', 'B', 'A', 'S',
    'L', 'B', 'V', 'E', 'Q', 'R', 'H', 'N', 'P', 'C',
    'M', 'Q', 'B', 'M', 'Y', 'B', 'U', 'Q', 'T', 'P',
    'P', 'G', 'J', 'H', 'B', 'U', 'F', 'L', 'T', 'I',
    'H', 'P', 'S', 'R', 'T', 'E', 'H', 'C', 'Z', 'F',
    'D', 'W', 'L', 'S', 'Z', 'A', 'B', 'E', 'O', 'C',
    'U', 'P', 'C', 'A', 'K', 'E', 'T', 'A', 'D', 'Y',
    'C', 'Z', 'Y', 'D', 'W', 'B', 'L', 'V', 'M', 'U',
    'D', 'R', 'L', 'V', 'N', 'M', 'U', 'E', 'D', 'R',
    'J', 'X', 'F', 'R', 'I', 'Z', 'Y', 'L', 'K', 'F',
    'V', 'Y', 'S', 'S', 'Q', 'A', 'B', 'P', 'R', 'Y',
    'Q', 'Y', 'X', 'Y', 'Z', 'M', 'K', 'Y', 'I', 'X',
    'P', 'D', 'T', 'D', 'D', 'A', 'W', 'F', 'W', 'M',
    'K', 'I', 'T', 'U', 'I', 'C', 'M', 'M', 'S', 'L',
    'U', 'G', 'S', 'J', 'P', 'N', 'T', 'C', 'I', 'U',
  ];

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const spokenWord = event.results[0][0].transcript.toUpperCase();
      console.log("Spoken Word:", spokenWord);
      setCurrentWord(spokenWord);
      handleWordSubmit(spokenWord);
    };
    setSpeechRecognition(recognition);

    
  }, []);

  const startListening = () => {
    if (speechRecognition) {
      speechRecognition.start();
    }
  };

  const stopListening = () => {
    if (speechRecognition) {
      speechRecognition.stop();
    }
  };

  const handleWordSubmit = (spokenWord) => {
    console.log("Handling word submission for:", spokenWord);
    const trimmedSpokenWord = spokenWord.trim().toUpperCase().replace(/\.$/, ""); // Trim, convert to uppercase, and remove trailing period
    console.log("Trimmed spoken word:", trimmedSpokenWord);
    const foundWordIndex = words.findIndex(word => word === trimmedSpokenWord); // Compare with trimmed and uppercase word
    console.log("Found word index:", foundWordIndex);
    if (foundWordIndex !== -1) {
      // Strike out the word from the puzzle
      console.log("Word found in the list.");
      const updatedSelectedLetters = [...selectedLetters];
      for (let i = 0; i < puzzle.length; i++) {
        if (puzzle.slice(i, i + trimmedSpokenWord.length).join('') === trimmedSpokenWord) { // Use trimmed and uppercase word
          updatedSelectedLetters.fill(true, i, i + trimmedSpokenWord.length);
        }
      }
      console.log("Updated selected letters:", updatedSelectedLetters);
      setSelectedLetters(updatedSelectedLetters);
  
      // Add the spoken word to the list of found words
      console.log("Adding word to found words:", trimmedSpokenWord);
      setFoundWords(prevFoundWords => [...prevFoundWords, trimmedSpokenWord]);
    } else {
      console.log("Word not found in the list.");
    }
    setCurrentWord(""); // Clear current word
    setTurn(turn === 1 ? 2 : 1); // Switch turn
  };
  

  const currentPlayer = turn === 1 ? "Player 1" : "Player 2";

  return (

    <div style={{ display: 'flex', alignItems: 'center', fontSize: '18px' }}>
      <Link to="/dashboard" style={{ position: 'absolute', top: '5px', left: '5px', textDecoration: 'none', color: 'gray', fontSize: '30px' }}>
        X
      </Link>
      <div style={{ width: '100px', margin: '10px', textAlign: 'center' }}></div>
      <h1>Joint Category Game: Animals</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gap: '2px' }}>
        {puzzle.map((letter, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ddd',
              padding: '10px',
              textAlign: 'center',
              background: selectedLetters[index] ? '#aaf' : '#fff',
              cursor: 'pointer',
              textDecoration: foundWords.some((word) => word.includes(letter)) ? 'line-through' : 'none',
              fontSize: '12px',
            }}
          >
            {letter}
          </div>
        ))}
      </div>
      <div>
        <p>{currentPlayer}'s Turn to Speak</p>
        <button onClick={startListening}>Start Listening</button>
        <button onClick={stopListening}>Stop Listening</button>
      </div>
      <div>
        <h2>Found Words:</h2>
        <ul>
          {foundWords.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryGame;