import { React, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../../firebase-config";
import LingDetection from "../../components/lingDetection/LingDetection";
import LingDetectionLvl2 from "../../components/lingDetection/LingDetectionLvl2";

//Page for Detection Game
function LingDetectionPage() {
    //Variables for progress, score, and sound states
    const [progress, setProgress] = useState(0);
    const [score, setScore] = useState(0);
    const [soundsArr, setSoundsArr] = useState([[0, 0]]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [voice, setVoice] = useState(localStorage.getItem("selectedVoice"));

    //Handler to update progression and score
    const progressHandler = (newProgress, newScore) => {
        setProgress(newProgress);
        setScore(newScore);
    };

    useEffect(() => {
        //Retrieve sounds from db
        const getLingSounds = async function () {
            const docRef = doc(db, "audio", "ling");
            const docSnap = await getDoc(docRef);

            console.log(docSnap);

            //Checking to make sure docs were correctly grabbed
            if (docSnap.exists()) {
                //Set array of sounds with associated key value
                setSoundsArr(
                    Object.keys(docSnap.data()).map((key) => [
                        key,
                        docSnap.data()[key],
                    ])
                );
            }
        };

        //Call func declared earlier
        getLingSounds();
    }, []);

    useEffect(() => {
        const savedVoice = localStorage.getItem("selectedVoice");
        if (savedVoice) {
            setVoice(savedVoice);
        }
    }, []);

    useEffect(() => {
        const getLingSounds = async function () {
            let docRef = null;
            if (voice === "female_a") {
                docRef = doc(
                    db,
                    "audio_voices",
                    "female_a",
                    "ling_detection_game_2",
                    "sounds"
                );
            } else if (voice === "female_b") {
                docRef = doc(
                    db,
                    "audio_voices",
                    "female_b",
                    "ling_detection_discrimination_game_2",
                    "sounds"
                );
            } else if (voice === "female_c") {
                docRef = doc(
                    db,
                    "audio_voices",
                    "female_c",
                    "ling_detection_discrimination_game_2",
                    "sounds"
                );
            } else if (voice === "male_a") {
                docRef = doc(
                    db,
                    "audio_voices",
                    "male_a",
                    "ling_detection_game_2",
                    "sounds"
                );
            } else if (voice === "male_b" || voice === "male_c" || voice === "male_d") {
                // Extracting the last character from the voice variable
                const letter = voice.charAt(voice.length - 1);
            
                docRef = doc(
                    db,
                    "audio_voices",
                    "male_" + letter, // Correctly concatenates the letter with "male_"
                    "ling_detection_discrimination_game_2",
                    "sounds"
                );
            }
                   
            else {
                docRef = doc(
                    db,
                    "audio_voices",
                    "female_a",
                    "ling_detection_game_2",
                    "sounds"
                );
            }

            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setSoundsArr(
                    Object.keys(docSnap.data()).map((key) => [
                        key,
                        docSnap.data()[key],
                    ])
                );
            }
        };
        getLingSounds();
    }, [voice]);




    // Function to play audio sample for each voice
    const playAudioSample = async (voiceType) => {
        let docRef;

        if (voiceType === "female_a" || voiceType === "male_a") {
            docRef = doc(
                db,
                "audio_voices",
                voiceType,
                "ling_discrimination_game_2", 
                "sounds"
            );
        } else {
            docRef = doc(
                db,
                "audio_voices",
                voiceType,
                "ling_detection_discrimination_game_2", 
                "sounds"
            );
        }

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const audioSampleUrl = docSnap.data()["a"]; // Use the correct field name based on your Firestore structure
            const audio = new Audio(audioSampleUrl);
            audio.play();
        } else {
            console.log("No audio URL found!");
        }
    };



    const handleSetVoice = (newVoice) => {
        const confirmChange = window.confirm(
            "Are you sure you want to select a new voice? This will restart the game."
        );
        if (confirmChange) {
            localStorage.setItem("selectedVoice", newVoice);
            window.location.reload();
        }
    };

    
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    //Display
    return (
        <>

<div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                <div className="wrapper">
                    <div className="close-btn">
                        <button onClick={closeSidebar}>&times;</button>
                    </div>

                    {/* Voice selection buttons with preview buttons */}
                    <div className="voice-choice-wrapper">
                        <button
                            className="voice-btn"
                            onClick={() => handleSetVoice("female_a")}
                        >
                            Female A
                        </button>
                        <button
                            className="preview-btn"
                            onClick={() => playAudioSample("female_a")}
                        >
                            🔊
                        </button>
                    </div>
                    <div className="voice-choice-wrapper">
                        <button
                            className="voice-btn"
                            onClick={() => handleSetVoice("female_b")}
                        >
                            Female B
                        </button>
                        <button
                            className="preview-btn"
                            onClick={() => playAudioSample("female_b")}
                        >
                            🔊
                        </button>
                    </div>
                    <div className="voice-choice-wrapper">
                        <button
                            className="voice-btn"
                            onClick={() => handleSetVoice("female_c")}
                        >
                            Female C
                        </button>
                        <button
                            className="preview-btn"
                            onClick={() => playAudioSample("female_c")}
                        >
                            🔊
                        </button>
                    </div>
                    <div className="voice-choice-wrapper">
                        <button
                            className="voice-btn"
                            onClick={() => handleSetVoice("female_d")}
                        >
                            Female D
                        </button>
                        <button
                            className="preview-btn"
                            onClick={() => playAudioSample("female_d")}
                        >
                            🔊
                        </button>
                    </div>
                    <div className="voice-choice-wrapper">
                        <button
                            className="voice-btn"
                            onClick={() => handleSetVoice("male_a")}
                        >
                            Male A
                        </button>
                        <button
                            className="preview-btn"
                            onClick={() => playAudioSample("male_a")}
                        >
                            🔊
                        </button>
                    </div>
                    <div className="voice-choice-wrapper">
                        <button
                            className="voice-btn"
                            onClick={() => handleSetVoice("male_b")}
                        >
                            Male B
                        </button>
                        <button
                            className="preview-btn"
                            onClick={() => playAudioSample("male_b")}
                        >
                            🔊
                        </button>
                    </div>
                    <div className="voice-choice-wrapper">
                        <button
                            className="voice-btn"
                            onClick={() => handleSetVoice("male_c")}
                        >
                            Male C
                        </button>
                        <button
                            className="preview-btn"
                            onClick={() => playAudioSample("male_c")}
                        >
                            🔊
                        </button>
                    </div>
                    <div className="voice-choice-wrapper">
                        <button
                            className="voice-btn"
                            onClick={() => handleSetVoice("male_d")}
                        >
                            Male D
                        </button>
                        <button
                            className="preview-btn"
                            onClick={() => playAudioSample("male_d")}
                        >
                            🔊
                        </button>
                    </div>
                </div>
            </div>
            <button className="voice-select-btn" onClick={toggleSidebar}>
                Voice Selector
            </button>



            {/* Calls LingDetection and passes required params. 
      If you'd like to edit Detection Game, please refer to -LingDetection.js- */}
            <LingDetectionLvl2
                objKey={"activitydetection"}
                score={score}
                prog={progress}
                progressHandler={progressHandler}
                sound={Math.floor(Math.random() * 2)} //default is 2, increase the number for less chance of no sound
                arr={soundsArr}
            />
        </>
    );
}

export default LingDetectionPage;
