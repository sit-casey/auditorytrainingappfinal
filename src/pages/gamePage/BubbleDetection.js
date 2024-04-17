/*import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

function Bubble({ style, onClick }) {
  return <div className="bubble" style={style} onClick={onClick}></div>;
}

function BubbleDetection() {
  const [gameStarted, setGameStarted] = useState(false);
  const [bubble, setBubble] = useState(null);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const [showModal, setShowModal] = useState(false);
  const [bubbleClicked, setBubbleClicked] = useState(false);
  const [executeTimeoutOnce, setExecuteTimeoutOnce] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      setExecuteTimeoutOnce(false);
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted && bubble === null) {
      scoreRef.current = score;
      setTimeout(() => {
        setBubbleClicked(false);
        const newBubble = {
          top: `${Math.random() * 70}%`,
          left: `${Math.random() * 70}%`,
          size: `${Math.random() * 30 + 20}px`,
        };
        setBubble(newBubble);
        playSound();
        setTimeout(() => {
          setBubble(null);
        }, 4000);
      }, 2000);

      if (!executeTimeoutOnce && gameStarted) {
        setExecuteTimeoutOnce(true);
        setTimeout(() => {
          setBubble(null);
          alert(`Game Over! Your final score is: ${scoreRef.current}`);
          setGameStarted(false); // Reset gameStarted state
        }, 60000);
      }
    }
  }, [gameStarted, bubble, bubbleClicked, executeTimeoutOnce, score]);

  const playSound = async () => {
    try {
      const audio = new Audio(
        "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fchoicesound%2Frightanswer-95219.mp3?alt=media&token=d9168b1b-904c-4af8-8a87-89e0bcbdc582"
      );
      await audio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const burstBubble = () => {
    setScore((score) => score + 1);
    setBubble(null);
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
      <Link
        to="/dashboard"
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          textDecoration: "none",
          color: "gray",
          fontSize: "30px",
        }}
      >
        X
      </Link>
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
          <Link
            to="/dashboard"
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              textDecoration: "none",
              color: "gray",
              fontSize: "30px",
            }}
          >
            X
          </Link>
          {bubble && (
            <Bubble
              onClick={burstBubble}
              style={{
                top: bubble.top,
                left: bubble.left,
                width: bubble.size,
                height: bubble.size,
              }}
            />
          )}
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
export default BubbleDetection;*/
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

function Bubble({ style, onClick }) {
  return <div className="bubble" style={style} onClick={onClick}></div>;
}

function BubbleDetection() {
  const [gameStarted, setGameStarted] = useState(false);
  const [bubble1, setBubble1] = useState(null);
  const [bubble2, setBubble2] = useState(null);
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

  useEffect(() => {
    if (gameStarted && bubble1 === null) {
      scoreRef.current = score;
      setTimeout(() => {
        const newBubble = {
          top: `${Math.random() * 70}%`,
          left: `${Math.random() * 70}%`,
          size: `${Math.random() * 30 + 20}px`,
        };
        setBubble1(newBubble);
        playSound();
        setTimeout(() => {
          setBubble1(null);
        }, 5000);
      }, 1000); // Delay before each new bubble
    }

    if (gameStarted && bubble2 === null) {
      scoreRef.current = score;
      setTimeout(() => {
        const newBubble = {
          top: `${Math.random() * 70}%`,
          left: `${Math.random() * 70}%`,
          size: `${Math.random() * 30 + 20}px`,
        };
        setBubble2(newBubble);
        playSound();
        setTimeout(() => {
          setBubble2(null);
        }, 5000);
      }, 1500); // Delay before each new bubble
    }

    if (!executeTimeoutOnce && gameStarted) {
      setExecuteTimeoutOnce(true);
      setTimeout(() => {
        alert(`Game Over! Your final score is: ${scoreRef.current}`);
        setGameStarted(false);
      }, 60000);
    }
  }, [gameStarted, bubble1, bubble2, executeTimeoutOnce, score]);

  const playSound = async () => {
    try {
      const audio = new Audio(
        "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fchoicesound%2Frightanswer-95219.mp3?alt=media&token=d9168b1b-904c-4af8-8a87-89e0bcbdc582"
      );
      await audio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const burstBubble = (bubbleNumber) => {
    setScore((score) => score + 1);
    if (bubbleNumber === 1) {
      setBubble1(null);
    } else if (bubbleNumber === 2) {
      setBubble2(null);
    }
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
      <Link
        to="/dashboard"
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          textDecoration: "none",
          color: "gray",
          fontSize: "30px",
        }}
      >
        X
      </Link>
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
          <Link
            to="/dashboard"
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              textDecoration: "none",
              color: "gray",
              fontSize: "30px",
            }}
          >
            X
          </Link>
          {bubble1 && (
            <Bubble
              onClick={() => burstBubble(1)}
              style={{
                top: bubble1.top,
                left: bubble1.left,
                width: bubble1.size,
                height: bubble1.size,
              }}
            />
          )}
          {bubble2 && (
            <Bubble
              onClick={() => burstBubble(2)}
              style={{
                top: bubble2.top,
                left: bubble2.left,
                width: bubble2.size,
                height: bubble2.size,
              }}
            />
          )}
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
