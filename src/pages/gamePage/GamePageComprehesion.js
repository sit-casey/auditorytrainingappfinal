import { React, useState } from "react";

import Nav from "../../components/nav/Nav";
import GameOptions from "../../components/Game Options/GameOptions";
import classes from "./gamePageDetection.module.css";

import { allComprehensionGames } from "../../helpers/allComprehensionGames";

//Game page for detection games specifically

function GamePageAudioMemory() {

  //Actual display
  return (
    <>
    {/* Nav bar */}
    <Nav />
    {(
      <div>
        {/* Title and instructions */}
        <div className = {classes.header}>
          <h1>Comprehension Activities</h1>
          <p></p>
        </div>
        {/* List of buttons for activities  */}
        {/* If you'd like to edit activities, please refer to -GameOptions.js- or -allDetectionGames- */}
       {/* <button type="button" class={classes.section_dropdown}>Activity Section 1</button>*/}
          <div class={classes.buttonlayout}>
            <div className={classes.allComprehensionGames}>
              <GameOptions
                optionsArr={allComprehensionGames.comprehension}
              />
            </div>
          </div>
      </div>
    )}
  </>
  );
}


export default GamePageAudioMemory;