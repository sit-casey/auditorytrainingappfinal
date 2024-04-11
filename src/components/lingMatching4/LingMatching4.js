import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

function MatchingGame4() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [completed, setCompleted] = useState(false);

  // Change these sounds to whatever you want
  const sounds = [
    'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Ffemale_A%2Fa.mp3?alt=media&token=9838cb6b-04f1-4dde-8c7b-f390ec49028a',
    'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Ffemale_A%2Fee.mp3?alt=media&token=04f9cab7-8195-4b9d-b377-49df84fcdf66',
    'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Ffemale_A%2Fh.mp3?alt=media&token=66350896-446e-49e2-b85f-f1cad7898ae5',
    'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Ffemale_A%2Fj.mp3?alt=media&token=1c7dc582-0431-4026-90b6-e0a852320031',
    'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Ffemale_A%2Fm.mp3?alt=media&token=30a148cc-8e4f-4acd-a1a5-19eb668bcfe0',
    'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Ffemale_A%2Fn.mp3?alt=media&token=958a8db9-930e-4fad-ba00-7786f58ac21d',
    'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Ffemale_A%2Fu.mp3?alt=media&token=49c80045-c1ee-4f78-9657-f22ce9d3db7e',
    'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Ffemale_A%2Fsss.mp3?alt=media&token=4ed1a863-9c66-4d9a-833f-5c6157a39a62',
    'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Ffemale_A%2Fshh.mp3?alt=media&token=11dd0280-5e91-4a94-aa01-7be25ffb70fa',
    'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Ffemale_A%2Fz.mp3?alt=media&token=4992f9e1-db76-4d11-bc17-0b6d3b891e1a',
    'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Fmale_b%2Fa.mp3?alt=media&token=37d8a545-1974-43cd-8403-8d7d5d1b79fc',
    'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Fmale_b%2Fe.mp3?alt=media&token=65a10b67-9bb9-4bcf-9324-9b477b228071',
    'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Fmale_b%2Fh.mp3?alt=media&token=4a5b79a4-7a8b-4054-81bb-575d8b073a9c',
    'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Fmale_b%2Fj.mp3?alt=media&token=08cee2d4-cbc5-410c-901f-e2f91f52afa1',
    'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Fmale_b%2Fm.mp3?alt=media&token=644ce0d9-8051-41ea-afcc-0a19e4a19eac',
    'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Fmale_b%2Fn.mp3?alt=media&token=07952e75-c141-4144-951e-348ada452992',
    'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Fmale_b%2Foo.mp3?alt=media&token=6dea7536-8fcb-47eb-acf0-a3085aaf8581',
    'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Fmale_b%2Fs.mp3?alt=media&token=33d14b88-c5a0-4777-ac52-b7773de16f75',
    'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Fmale_b%2Fsh.mp3?alt=media&token=7702587e-8e7f-46ab-aa9f-e4d7192eaea1',
    'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Fmale_b%2Fz.mp3?alt=media&token=fed85331-1886-4966-8718-0fc3ead98adc'
  ];

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  useEffect(() => {
    generateItems();
  }, []);

  const generateItems = () => {
    const totalItems = 24; // 6 items for one level
    const values = Array.from({ length: totalItems / 2 }, (_, index) => index + 1);
    const shuffledValues = [...values, ...values].sort(() => Math.random() - 0.5);
    setItems(shuffledValues.map(value => ({ value, matched: false })));
  };

  const handleClick = (index) => {
    if (selected.length < 2 && !selected.includes(index)) {
      setSelected([...selected, index]);
      playSound(sounds[items[index].value - 1]);
    }
  };

  useEffect(() => {
    if (selected.length === 2) {
      const [index1, index2] = selected;
      if (items[index1].value === items[index2].value) {
        const updatedItems = [...items];
        updatedItems[index1].matched = true;
        updatedItems[index2].matched = true;
        setItems(updatedItems);
      }
      setTimeout(() => {
        setSelected([]);
      }, 1000);
    }
  }, [selected, items]);

  useEffect(() => {
    const completedPairs = items.filter(item => item.matched).length / 2;
    if (completedPairs === 12) {
      setCompleted(true);
    }
  }, [items]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Link to="/dashboard" style={{ position: 'absolute', top: '10px', left: '10px', textDecoration: 'none', color: 'gray', fontSize: '30px' }}>
        X
      </Link>
      <h1>Matching Game: Level 4</h1>
      {completed ? (
        <div>
          <h2>Congratulations! You completed the game!</h2>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 100px)', gap: '10px', textAlign: 'center' }}>
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              style={{
                width: '100px',
                height: '100px',
                border: '1px solid #000',
                cursor: 'pointer',
                background: item.matched ? '#ccc' : '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
              }}
            >
              {item.matched ? item.value : ' '}
            </div>
          ))}
        </div>
      )}
      </div>
  );
}

export default MatchingGame4;
