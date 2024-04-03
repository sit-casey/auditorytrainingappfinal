import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import LingComprehension from "../../components/lingComprehension/LingComprehension"

function LingComprehensionPage() {
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [soundsArr, setSoundsArr] = useState([]);

  const progressHandler = (newProgress, newScore) => {
    setProgress(newProgress);
    setScore(newScore);
  };

  useEffect(() => {
    const fetchSounds = async () => {
      try {
        const docRef = doc(db, "audio", "ling"); //TODO
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const audioData = docSnap.data();
          const soundsArray = Object.entries(audioData).map(([key, value]) => ({
            word: key,
            sound: value,
          }));
          setSoundsArr(soundsArray);
        }
      } catch (error) {
        console.error("Error fetching sounds:", error);
      }
    };

    fetchSounds();
  }, []);

  return (
    <>
      <LingComprehension
        objKey={"LingComprehension"}
        score={score}
        prog={progress}
        progressHandler={progressHandler}
        sound={Math.floor(Math.random() * 2)} //default is 2, increase the number for less chance of no sound
        arr={soundsArr}      
      />
    </>
  );
}

export default LingComprehensionPage;
