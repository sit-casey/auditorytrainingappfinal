import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import socketIOClient from "socket.io-client";



const words = [
  "CAT",
  "DOG",
  "FISH",
  "BIRD",
  "HORSE",
  "RABBIT",
  "TIGER",
  "ELEPHANT",
  "MONKEY",
  "LION",
];

const CategoryGame = () => {
  const [selectedLetters, setSelectedLetters] = useState(
    Array(100).fill(false)
  );
  const [foundWords, setFoundWords] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [turn, setTurn] = useState(1); // Player 1 starts
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Animals");
  //const [socket, setSocket] = useState(null);


  // Define the puzzle grid
  const puzzle = [
    "C",
    "V",
    "A",
    "F",
    "X",
    "K",
    "E",
    "S",
    "G",
    "J",
    "Z",
    "G",
    "B",
    "C",
    "C",
    "F",
    "N",
    "M",
    "U",
    "J",
    "T",
    "E",
    "V",
    "J",
    "K",
    "X",
    "K",
    "A",
    "D",
    "I",
    "R",
    "B",
    "W",
    "K",
    "C",
    "Q",
    "J",
    "Y",
    "B",
    "B",
    "S",
    "G",
    "Q",
    "Y",
    "F",
    "G",
    "V",
    "G",
    "X",
    "P",
    "M",
    "R",
    "O",
    "D",
    "S",
    "N",
    "J",
    "O",
    "G",
    "N",
    "J",
    "F",
    "Y",
    "C",
    "H",
    "A",
    "I",
    "R",
    "C",
    "U",
    "T",
    "H",
    "L",
    "U",
    "C",
    "C",
    "A",
    "B",
    "W",
    "J",
    "J",
    "B",
    "V",
    "G",
    "H",
    "E",
    "J",
    "W",
    "H",
    "S",
    "K",
    "H",
    "M",
    "Y",
    "Y",
    "H",
    "I",
    "B",
    "B",
    "W",
    "Q",
    "E",
    "L",
    "V",
    "A",
    "E",
    "G",
    "M",
    "V",
    "X",
    "W",
    "Q",
    "D",
    "B",
    "O",
    "Z",
    "R",
    "O",
    "H",
    "K",
    "F",
    "R",
    "W",
    "J",
    "I",
    "R",
    "E",
    "B",
    "E",
    "N",
    "M",
    "B",
    "B",
    "C",
    "Q",
    "M",
    "P",
    "W",
    "H",
    "F",
    "W",
    "O",
    "H",
    "N",
    "M",
    "Q",
    "M",
    "S",
    "I",
    "R",
    "Z",
    "X",
    "R",
    "O",
    "S",
    "N",
    "L",
    "Q",
    "D",
    "N",
    "E",
    "R",
    "O",
    "S",
    "P",
    "R",
    "A",
    "C",
    "E",
    "R",
    "Y",
    "R",
    "S",
    "W",
    "J",
    "P",
    "A",
    "L",
    "O",
    "Q",
    "S",
    "C",
    "R",
    "T",
    "F",
    "Y",
    "I",
    "X",
    "H",
    "B",
    "T",
    "F",
    "L",
    "B",
    "J",
    "K",
    "N",
    "H",
    "O",
    "S",
    "B",
    "N",
    "K",
    "Y",
    "P",
    "E",
    "W",
    "L",
    "G",
    "A",
    "A",
    "H",
    "Z",
    "O",
    "S",
    "H",
    "E",
    "H",
    "R",
    "E",
    "X",
    "A",
    "S",
    "B",
    "N",
    "R",
    "P",
    "W",
    "C",
    "T",
    "I",
    "L",
    "D",
    "Y",
    "M",
    "T",
    "H",
    "D",
    "M",
    "G",
    "G",
    "E",
    "S",
    "Y",
    "M",
    "O",
    "I",
    "S",
    "I",
    "I",
    "O",
    "R",
    "L",
    "A",
    "T",
    "Y",
    "M",
    "B",
    "A",
    "S",
    "L",
    "B",
    "V",
    "E",
    "Q",
    "R",
    "H",
    "N",
    "P",
    "C",
    "M",
    "Q",
    "B",
    "M",
    "Y",
    "B",
    "U",
    "Q",
    "T",
    "P",
    "P",
    "G",
    "J",
    "H",
    "B",
    "U",
    "F",
    "L",
    "T",
    "I",
    "H",
    "P",
    "S",
    "R",
    "T",
    "E",
    "H",
    "C",
    "Z",
    "F",
    "D",
    "W",
    "L",
    "S",
    "Z",
    "A",
    "B",
    "E",
    "O",
    "C",
    "U",
    "P",
    "C",
    "A",
    "K",
    "E",
    "T",
    "A",
    "D",
    "Y",
    "C",
    "Z",
    "Y",
    "D",
    "W",
    "B",
    "L",
    "V",
    "M",
    "U",
    "D",
    "R",
    "L",
    "V",
    "N",
    "M",
    "U",
    "E",
    "D",
    "R",
    "J",
    "X",
    "F",
    "R",
    "I",
    "Z",
    "Y",
    "L",
    "K",
    "F",
    "V",
    "Y",
    "S",
    "S",
    "Q",
    "A",
    "B",
    "P",
    "R",
    "Y",
    "Q",
    "Y",
    "X",
    "Y",
    "Z",
    "M",
    "K",
    "Y",
    "I",
    "X",
    "P",
    "D",
    "T",
    "D",
    "D",
    "A",
    "W",
    "F",
    "W",
    "M",
    "K",
    "I",
    "T",
    "U",
    "I",
    "C",
    "M",
    "M",
    "S",
    "L",
    "U",
    "G",
    "S",
    "J",
    "P",
    "N",
    "T",
    "C",
    "I",
    "U",
  ];


  // Function to handle category selection
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  
  // Define the word search functions
  const checkHorizontal = (startRow, startCol, word) => {
    if (startCol + word.length <= puzzle[0].length) {
      for (let i = 0; i < word.length; i++) {
        if (puzzle[startRow][startCol + i] !== word[i]) {
          return false;
        }
      }
      return true;
    }
    return false;
  };

  const checkVertical = (startRow, startCol, word) => {
    if (startRow + word.length <= puzzle.length) {
      for (let i = 0; i < word.length; i++) {
        if (puzzle[startRow + i][startCol] !== word[i]) {
          return false;
        }
      }
      return true;
    }
    return false;
  };

  const checkDiagonal = (startRow, startCol, word) => {
    if (
      startRow + word.length <= puzzle.length &&
      startCol + word.length <= puzzle[0].length
    ) {
      for (let i = 0; i < word.length; i++) {
        if (puzzle[startRow + i][startCol + i] !== word[i]) {
          return false;
        }
      }
      return true;
    }
    return false;
  };

  // Test function to check if a word is found in the puzzle
  const testWordSearch = (word) => {
    console.log(`Testing word search for '${word}':`);
    let found = false;

    // Loop through the puzzle grid
    for (let i = 0; i < puzzle.length; i++) {
      for (let j = 0; j < puzzle[i].length; j++) {
        // Check if the word is found horizontally from the current position
        if (checkHorizontal(i, j, word)) {
          console.log(
            `Found '${word}' horizontally starting from (${i}, ${j})`
          );
          found = true;
        }

        // Check if the word is found vertically from the current position
        if (checkVertical(i, j, word)) {
          console.log(`Found '${word}' vertically starting from (${i}, ${j})`);
          found = true;
        }

        // Check if the word is found diagonally from the current position
        if (checkDiagonal(i, j, word)) {
          console.log(`Found '${word}' diagonally starting from (${i}, ${j})`);
          found = true;
        }
      }
    }

    if (!found) {
      console.log(`'${word}' not found in the puzzle.`);
    }
  };

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
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
    recognition.onstart = () => {
      console.log("Speech recognition started.");
    };
    recognition.onend = () => {
      console.log("Speech recognition ended.");
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
    const trimmedSpokenWord = spokenWord
      .trim()
      .toUpperCase()
      .replace(/\.$/, ""); // Trim, convert to uppercase, and remove trailing period
    console.log("Trimmed spoken word:", trimmedSpokenWord);

    // Search for the spoken word in the list of words
    const foundWord = words.find((word) => word === trimmedSpokenWord);

    if (foundWord) {
      // If the word is found
      const updatedSelectedLetters = [...selectedLetters]; // Create a copy of selected letters array
      const wordIndex = words.indexOf(foundWord); // Get the index of the found word in the list of words
      const word = words[wordIndex]; // Get the word from the list of words

      // Loop through the puzzle to find the word
      for (let i = 0; i < puzzle.length; i++) {
        for (let j = 0; j < puzzle[i].length; j++) {
          // Check horizontally, vertically, and diagonally for the entire word
          if (
            checkHorizontal(i, j, word) ||
            checkVertical(i, j, word) ||
            checkDiagonal(i, j, word)
          ) {
            // Mark the entire word as selected
            for (let k = 0; k < word.length; k++) {
              updatedSelectedLetters[
                (i + (checkVertical(i, j, word) ? k : 0)) * puzzle[0].length +
                  j +
                  (checkDiagonal(i, j, word) ? k : 0)
              ] = true;
            }
          }
        }
      }
      console.log("Updated selected letters:", updatedSelectedLetters);
      setSelectedLetters(updatedSelectedLetters); // Update selected letters
      setFoundWords((prevFoundWords) => [...prevFoundWords, trimmedSpokenWord]); // Add the found word to the list of found words
    } else {
      console.log("Word not found in the list.");
    }
    setCurrentWord(""); // Clear current word
    setTurn(turn === 1 ? 2 : 1); // Switch turn
  };

  const currentPlayer = turn === 1 ? "Player 1" : "Player 2";

  return (
    <div className="gameContainer">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '18px' }}>
        <Link to="/dashboard" style={{ position: 'absolute', top: '5px', left: '5px', textDecoration: 'none', color: 'gray', fontSize: '30px' }}>
          X
        </Link>
        <h1 style={{ marginBottom: '20px' }}>WordSearch with Friends</h1>
        <label htmlFor="categorySelect">Category:</label>
        <select 
          id="categorySelect" 
          value={selectedCategory} 
          onChange={handleCategoryChange}
          style={{ marginLeft: '5px', marginBottom: '10px' }}
        >
          <option value="Animals">Animals</option>
          {/* Add other category options as needed */}
        </select>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(20, 1fr)",
            gap: "2px",
            marginBottom: "20px",
          }}
        >
          {puzzle.map((letter, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                textAlign: "center",
                background: selectedLetters[index] ? "#aaf" : "#fff",
                cursor: "pointer",
                textDecoration: foundWords.some((word) => word.includes(letter))
                  ? "line-through"
                  : "none",
                fontSize: "12px",
              }}
            >
              {letter}
            </div>
          ))}
        </div>
        <div>
          <div style={{ textAlign: "center" }}>
            <p>{currentPlayer}'s Turn to Speak</p>
          </div>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <button onClick={startListening}>Start Listening</button>
            <button onClick={stopListening}>Stop Listening</button>
          </div>
        </div>
        <div>
          <h2>Words Found:</h2>
          <ul style={{ fontSize: "18px" }}> {/* Increased font size here */}
            {foundWords.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryGame;
