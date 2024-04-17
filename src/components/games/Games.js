import React, { useRef } from "react";
import Game from "../game/Game";
import classes from "./acts.module.css";

function Games(props) {
  const displayRef = useRef(null); // Step 1: Creating a ref

  // Step 2: Function to handle left scroll
  const scrollLeft = () => {
    if (displayRef.current) {
      displayRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  // Step 2: Function to handle right scroll
  const scrollRight = () => {
    if (displayRef.current) {
      displayRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Handles the color-coded difficulty.
  const lvlColorHandler = (lvl) => {
    if (lvl === 1) return `1`;
    if (lvl === 2) return `2`;
    if (lvl === 3) return `3`;
    if (lvl === 4) return `4`;
    return `N/A`;
  };

  return (
    <div className={classes.acts__container}>
      <h3>All Games</h3>
      <div className={classes.acts__title}>
        {/* Adding buttons for scrolling */}
        
      </div>

      <div className={classes.display} ref={displayRef}>
        {props.gamesArr.map((card, i) => (
          <Game
            key={i}
            title={card.title}
            src={card.src}
            link={card.link}
            level={lvlColorHandler(card.level)}
            desc={card.desc}
          />
        ))}
        
      </div>
     
    </div>
  );
}

export default Games;
