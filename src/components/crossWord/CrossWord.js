import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const words = [
  { word: 'Baseball', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2Fbaseball.mp3?alt=media&token=028281ef-a249-4cbc-9cd2-e864fa952b36' },
  { word: 'Cupcake', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2Fcupcake.mp3?alt=media&token=017112cc-137d-4712-8eaa-b222cb76e5c0' },
  { word: 'Airplane', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2Fairplane.mp3?alt=media&token=bdbdd718-baa7-45ec-8b6e-c8c5214b29aa' },
  { word: 'Armchair', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2Farmchair.mp3?alt=media&token=d82ade45-6f35-45b7-8b01-1a1e4337faf4' },
  { word: 'Birthday', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2Fbirthday.mp3?alt=media&token=3f83fb0f-2618-43a8-841f-7a3af5c2a221' },
  { word: 'Cowboy', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2Fcowboy.mp3?alt=media&token=79059bf2-71bf-4392-ba0e-962aa905464b' },
  { word: 'Cheeseball', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2Fcheeseball.mp3?alt=media&token=ef24246d-b9c8-4e07-895d-cc02c02d3e8a' },
  { word: 'Doormat', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2Fdoormat.mp3?alt=media&token=ae8bf780-9f8f-4e91-86c8-c0de6fc81927' },
  { word: 'Footprint', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2Ffootprint.mp3?alt=media&token=500f0067-548f-4586-9aa7-712d52da7f44' },
  { word: 'Haircut', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2Fhaircut.mp3?alt=media&token=600bb39d-544e-4bf8-9f43-ca21ae08fbab' },
];

const CrossWord = () => {
  const [selectedLetters, setSelectedLetters] = useState(Array(100).fill(false));
  const [foundWords, setFoundWords] = useState([]);

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
    const found = words
  .filter((word) => typeof word === 'string')
  .filter((word) =>
    word.split('').every((letter) => selectedLetters[puzzle.indexOf(letter)] === true)
  );

      
  }, []); // Empty dependency array to run only once on mount  

  const handleCellClick = (index) => {
    setSelectedLetters((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[index] = !newSelected[index];
      return newSelected;
    });
  };

  const playSound = (sound) => {
    // Implement sound playback logic here
    const audio = new Audio(sound);
    audio.play();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '18px' }}>
      <Link to="/dashboard" style={{ position: 'absolute', top: '5px', left: '5px', textDecoration: 'none', color: 'gray', fontSize: '30px' }}>
        X
      </Link>
      <div style={{ width: '100px', margin: '10px', textAlign: 'left' }}>
        <strong style={{ fontSize: '30px' }}>Words:</strong>
        <p>Press below to play the words</p>
        {words.map((word, index) => (
          <button
            key={index}
            style={{
              margin: '5px',
              fontSize: '1px',
              height: '50px',
              width: '50px',
              color: 'rgb(49, 49, 49)',
              // textDecoration: foundWords.includes(word.word) ? 'line-through' : 'none',
            }}
            onClick={() => playSound(word.sound)}
          >
            {/* <img
                class = "img"
                src={require("../../assets/icons/PlayButton.png")}
                height= '10px'
                width='10px'
                    
            /> */}
            {/* {word.word} */}
          </button>
        ))}
      </div>
      <div style={{ width: '1000px', margin: '10px auto' }}>
        <h1>Word Search: Level 1</h1>
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
              onClick={() => handleCellClick(index)}
            >
              {letter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrossWord;

