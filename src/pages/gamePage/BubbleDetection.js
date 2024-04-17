import React, { useState, useEffect, useRef  } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

function Bubble({ style, onClick }) {
  return <div className="bubble" style={style} onClick={onClick}></div>;
}

function BubbleDetection() {
  const [gameStarted, setGameStarted] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const [showModal, setShowModal] = useState(false);
  const [executeTimeoutOnce, setExecuteTimeoutOnce] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      setExecuteTimeoutOnce(false);
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
    }
  }, [gameStarted]);

  /*useEffect(() => {
    if (gameStarted && bubbles.length < 5) { // Adjust the number of bubbles appearing at once
      scoreRef.current = score;
      const newBubbles = [];
      for (let i = 0; i < 3; i++) { // Adjust the number of bubbles generated each time
        const newBubble = {
          id: uuidv4(),
          top: `${Math.random() * 70}%`,
          left: `${Math.random() * 70}%`,
          size: `${Math.random() * 30 + 20}px`,
          makeNoise: Math.random() < 0.5, // Determine if this bubble makes a sound
        };
        newBubbles.push(newBubble);
      }
      setBubbles((prevBubbles) => [...prevBubbles, ...newBubbles]);
      setTimeout(() => {
        const remainingBubbles = bubbles.filter(bubble => !newBubbles.some(newBubble => newBubble.id === bubble.id));
        setBubbles(remainingBubbles);
      }, 5000); // Adjust the duration before bubbles disappear
    }

    if (!executeTimeoutOnce && gameStarted) {
      setExecuteTimeoutOnce(true);
      setTimeout(() => {
        alert(`Game Over! Your final score is: ${scoreRef.current}`);
        setGameStarted(false);
      }, 30000);
    }
  }, [gameStarted, bubbles, executeTimeoutOnce, score]);*/
  useEffect(() => {
    if (gameStarted && bubbles.length < 7) { // Generate bubbles
      scoreRef.current = score;
      const newBubbles = [];
      let makeNoise = false; // Flag to determine if any bubble makes noise
      for (let i = 0; i < 7; i++) { // Generate 7 bubbles
        const noiseProbability = Math.random();
        if (noiseProbability < 0.2 && !makeNoise) { // Adjust probability of a bubble making noise
          makeNoise = true; // Set flag to true if any bubble makes noise
        }
        const newBubble = {
          id: uuidv4(),
          top: `${Math.random() * 70}%`,
          left: `${Math.random() * 70}%`,
          size: `${Math.random() * 30 + 20}px`,
          makeNoise: noiseProbability < 0.2, // Determine if this bubble makes a sound
          selected: false, // Flag to track if the bubble is selected
        };
        newBubbles.push(newBubble);
      }
      setBubbles((prevBubbles) => [...prevBubbles, ...newBubbles]);
      setTimeout(() => {
        const remainingBubbles = bubbles.filter(bubble => !newBubbles.some(newBubble => newBubble.id === bubble.id));
        setBubbles(remainingBubbles);
      }, 5000); // Adjust the duration before bubbles disappear
      if (makeNoise) { // Play sound only if any bubble makes noise
        const audioUrl = getRandomAudioUrl();
        playSound(audioUrl);
        setTimeout(() => {
          setBubbles(prevBubbles => prevBubbles.map(bubble => ({ ...bubble, makeNoise: false }))); // Reset makeNoise flag after sound plays
        }, 3000); // Adjust time limit for selecting bubbles after sound
      }
    }
  
    if (!executeTimeoutOnce && gameStarted) {
      setExecuteTimeoutOnce(true);
      setTimeout(() => {
        alert(`Game Over! Your final score is: ${scoreRef.current}`);
        setGameStarted(false);
      }, 30000); // Adjust the duration before clearing bubbles and starting a new batch
    }
  }, [gameStarted, bubbles, executeTimeoutOnce, score]);
  

  const burstBubble = (makeNoise) => {
    if (makeNoise) {
      setScore((score) => score + 1);
      playSound(getRandomAudioUrl());
    }
  };

  /*const playSound = async () => {
    try {
      const audio = new Audio(bubbleSound);
      await audio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };*/
  const playSound = async (audioUrl) => {
    try {
      const audio = new Audio(audioUrl);
      await audio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const getRandomAudioUrl = () => {
    // Array of audio URLs stored in Firebase
    const audioUrls = [
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Fvoice01%2Fa.mp3?alt=media&token=a67c69be-d4cc-401a-b0b5-eb8dced9c11b",
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Fvoice01%2Fee.mp3?alt=media&token=8c057693-a206-4b54-b722-84b8df8cb305",
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Fvoice01%2Fnu.mp3?alt=media&token=0faced4b-9914-4f11-b0fe-f98c34bb5ca7",
      // Add more audio URLs as needed
    ];
    // Get a random index within the array length
    const randomIndex = Math.floor(Math.random() * audioUrls.length);

    // Return the URL at the random index
    return audioUrls[randomIndex];
  };

  const startGame = () => {
    setScore(0); // Reset score
    setGameStarted(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {!gameStarted && (
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h1>Welcome to Bubble Pop Game</h1>
          <p>Click the start button below to begin the game!</p>
          <button
            style={{
              margin: 0,
              marginTop: "15px",
            }}
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
      )}
      {gameStarted && (
        <div className="container">
          {bubbles.map((bubble) => (
            <Bubble
              key={bubble.id}
              onClick={() => burstBubble(bubble.makeNoise)}
              style={{
                top: bubble.top,
                left: bubble.left,
                width: bubble.size,
                height: bubble.size,
              }}
            />
          ))}
          <div className="scoreContainer">Score: {score}</div>
        </div>
      )}
      {showModal && (
        <div className="modal">
          <p>Get ready... A sound will be played shortly!</p>
        </div>
      )}
    </div>
  );
}

export default BubbleDetection;
