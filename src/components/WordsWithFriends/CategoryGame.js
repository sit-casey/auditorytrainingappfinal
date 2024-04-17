/*import React, { useState, useEffect } from "react";
import classes from "./categoryGame.module.css";

const CategoryGame = () => {
  const [grid, setGrid] = useState(Array(15).fill(Array(15).fill("")));
  const [currentWord, setCurrentWord] = useState("");
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [turn, setTurn] = useState(1);
  const [speechRecognition, setSpeechRecognition] = useState(null);

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const spokenWord = event.results[0][0].transcript;
      setCurrentWord(spokenWord);
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

  const handleWordSpoken = () => {
    if (currentWord.trim() !== "") {
      const updatedGrid = grid.map((row, index) =>
        index === Math.floor(grid.length / 2)
          ? row.map((cell, cellIndex) =>
              cellIndex >= Math.floor(row.length / 2) &&
              cellIndex < Math.floor(row.length / 2) + currentWord.length
                ? currentWord.trim()[cellIndex - Math.floor(row.length / 2)]
                : cell
            )
          : row
      );
      setGrid(updatedGrid);
      setTurn(turn === 1 ? 2 : 1);
      setCurrentWord("");
    }
  };

  return (
    <div className={classes.gameContainer}>
      <h2 className={classes.title}>Words With Friends Game: Level 1</h2>
      <div className={classes.gameGrid}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className={classes.gameRow}>
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={classes.gameCell} 
                style={{
                  backgroundColor: cell === "" ? "white" : "lightgray",
                }}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={classes.controlsContainer}>
        <p className={classes.playerTurn}>Player {turn}'s turn to speak</p>
        <button className={classes.controlButton} onClick={startListening}>Start Listening</button>
        <button className={classes.controlButton} onClick={stopListening}>Stop Listening</button>
        <button className={classes.controlButton} onClick={handleWordSpoken}>Submit</button>
      </div>
      <div className={classes.scoreContainer}>
        <p>Player 1 Score: {player1Score}</p>
        <p>Player 2 Score: {player2Score}</p>
      </div>
    </div>
  );
};

export default CategoryGame;
*/

import React, { useState, useEffect } from "react";

const CategoryGame = () => {
  const [grid, setGrid] = useState(Array(15).fill(Array(15).fill("")));
  const [currentWord, setCurrentWord] = useState("");
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [turn, setTurn] = useState(1);
  const [speechRecognition, setSpeechRecognition] = useState(null);

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const spokenWord = event.results[0][0].transcript;
      setCurrentWord(spokenWord);
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

  const handleWordSpoken = () => {
    if (currentWord.trim() !== "") {
      const updatedGrid = grid.map((row, index) =>
        index === Math.floor(grid.length / 2)
          ? row.map((cell, cellIndex) =>
              cellIndex >= Math.floor(row.length / 2) &&
              cellIndex < Math.floor(row.length / 2) + currentWord.length
                ? currentWord.trim()[cellIndex - Math.floor(row.length / 2)]
                : cell
            )
          : row
      );
      setGrid(updatedGrid);
      setTurn(turn === 1 ? 2 : 1);
      setCurrentWord("");
    }
  };

  return (
    <div>
      <h2>Words With Friends Game</h2>
      <div>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex" }}>
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                style={{
                  border: "1px solid black",
                  width: "30px",
                  height: "30px",
                  textAlign: "center",
                  lineHeight: "30px",
                  backgroundColor: cell === "" ? "white" : "lightgray",
                }}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <p>Player {turn}'s turn to speak</p>
        <button onClick={startListening}>Start Listening</button>
        <button onClick={stopListening}>Stop Listening</button>
        <button onClick={handleWordSpoken}>Submit</button>
      </div>
      <div>
        <p>Player 1 Score: {player1Score}</p>
        <p>Player 2 Score: {player2Score}</p>
      </div>
    </div>
  );
};

export default CategoryGame;
