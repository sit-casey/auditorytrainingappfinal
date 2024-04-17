import { React, useState, useEffect } from "react";
import Nav from "../../components/nav/Nav";
import GameOptions from "../../components/Game Options/GameOptions"; // Check if this path is correct
import classes from "./gamePageDetection.module.css";
import { allComprehensionGames } from "../../helpers/allComprehensionGames";
import { db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { addDoc } from "firebase/firestore";

import { allAudioMemoryGames } from "../../helpers/allAudioMemoryGames";

//Game page for detection games specifically

function GamePageAudioMemory() {
  const [progress, setProgress] = useState(0);
  const [completedLevels, setCompletedLevels] = useState([]);

  useEffect(async () => {
    try {
      const userId = localStorage.getItem("user"); // Get the user ID from localStorage
      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }

      const q = query(
        collection(db, "levels"),
        where("userId", "==", userId), // Filter documents by user ID
        where("gameKey", "==", "comprehension") // Filter documents by gameKey
      );

      const querySnapshot = await getDocs(q);

      const fetchedLevels = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedLevels.push(data.gameLevel);
      });

      const completedLevelsCount = fetchedLevels.length;
      const completedLevels = querySnapshot.size;
      const totalLevels = 4;
      const progressPercentage = (completedLevels / totalLevels) * 100;
      console.log(progressPercentage);
      setProgress(progressPercentage);
      setCompletedLevels(fetchedLevels);
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
    }
  }, []);

  //Actual display
  return (
    <>
    {/* Nav bar */}
    <Nav />
    {(
      <div>
        {/* Title and instructions */}
        <div className = {classes.header}>
          <h1>Audio Memory Games</h1>
          <p>Please select your game!</p>
        </div>
        <div
          style={{ margin: "20px 0", fontSize: "18px", textAlign: "center" }}
        >
          <p>You have completed {completedLevels.length} out of 4 levels.</p>
        </div>
        <div
          className={classes.progressContainer}
          style={{
            width: "50%",
            margin: "20px auto",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f0f0f0",
            height: "20px",
            overflow: "hidden",
          }}
        >
          <div
            className={classes.progressBar}
            style={{
              width: `${progress}%`,
              backgroundColor: "#4caf50",
              height: "100%",
            }}
          ></div>
        </div>
          <div class={classes.buttonlayout}>
            <div className={classes.allAudioMemoryGames}>
              <GameOptions
                optionsArr={allAudioMemoryGames.audioMemory}
              />
            </div>
          </div>
      </div>
    )}
  </>
  );
}


export default GamePageAudioMemory;