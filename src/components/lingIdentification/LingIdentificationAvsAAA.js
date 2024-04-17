import { React, useState, useRef, useEffect } from "react";

import _ from "lodash";

import useFetch from "../custHooks/useFetch";
import Progress from "../progressBar/Progress";
import PlayButton from "../playButton/PlayButton";
import Completed from "../Completed/Completed";
import BackgroundMusicSelector from "../backgroundMusic/backgroundMusic";

import classes from "./lingIdentification.module.css";

//Purpose: Ling Identification Page
function LingIdentificationAvsAAA(props) {

  //Set up state variables
  const [choice, setChoice] = useState(null);
  const [currentScores, setCurrentScores] = useState([]);
  const [pop, setPop] = useState(false);
  const [soundS, setSound] = useState(true);
  const [[allActivitiesObj], isPending, err] = useFetch("allActivitiesObj");

  //Update current scores for completion modal
  useEffect(() => {
    setCurrentScores(
      allActivitiesObj?.lingActivityidentification?.completions.map(
        (comp) => comp
      )
    );
  }, [allActivitiesObj]);

  //Set up choices var
  const cardTrueRef = useRef(null);
  const cardFalseRef = useRef(null);

  //Progress bar setup
  let progressFGRef;
  const refSetter = (ref) => (progressFGRef = ref);

  //Set up score and sounds
  let score = props.score;
  let lingSound = null;
  var sound =
    "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fling%2Fshort_a.mp3?alt=media&token=e6ca1560-0398-44f1-9867-a35772609224;";
  var num = 0;
  var value = 3;
  var rightsound =
    "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fchoicesound%2Frightanswer-95219.mp3?alt=media&token=d9168b1b-904c-4af8-8a87-89e0bcbdc582;";
  var wrongsound =
    "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fchoicesound%2Fwronganswer-37702.mp3?alt=media&token=ade043bd-c027-4fd6-94ce-3c4c4133182b;";

  //randomly set one of the ling sounds from the database passed as an array from the parent component

  //Check if sounds are equal
  function isSoundEqual(a, b) {
    return a === b;
  }

  //Play correct sound
  const playRightSound = (rightsound) => {
    const audioContext = new AudioContext();
    audioContext.resume();

    const audioClip = new Audio(rightsound);

    const audioClipDuration = 900;
    audioClip.loop = true;
    setTimeout(() => (audioClip.loop = false), audioClipDuration * (1 - 1));
    audioClip.play();
  };

  //Play incorrect sound
  const playwrongSound = (wrongsound) => {
    const audioContext = new AudioContext();
    audioContext.resume();

    const audioClip = new Audio(wrongsound);

    const audioClipDuration = 950;
    audioClip.loop = true;
    setTimeout(() => (audioClip.loop = false), audioClipDuration * (1 - 1));
    audioClip.play();
  };

  //Randomize sound generation
  function soundHandler() {
    if (soundS) {
      window.num = Math.random() < 0.5 ? 0 : 1;
      if (window.num === 0) {
        window.value = 1;
      } else {
        if (window.num === 1) {
          window.value = 3;
        }
      }
      setSound(false);
    }
    if (!soundS) return;
  }

  //Check if the user is correct
  const checkHandler = async () => {
    const card = choice ? cardTrueRef : cardFalseRef;

    //No card was selected before the check
    if (choice === null) return;

    //Correct choice
    if (
      (choice && window.value === 1) ||
      (choice === false && window.value === 3)
    ) {
      score += 1;
      card.current.style.border = "8px green solid";
      playRightSound(rightsound);
    }

    //Incorrect choice
    if (
      (choice && window.value === 3) ||
      (choice === false && window.value === 1)
    ) {
      card.current.style.border = "8px red solid";
      playwrongSound(wrongsound);
    }

    //Update progression bar
    progressFGRef.current.style.width = `${props.prog + 10}%`;
    
    //Timeout between questions
    setTimeout(() => {
      cardTrueRef.current.style.border = "0";
      cardFalseRef.current.style.border = "0";
    }, 300);

    //Update score and progression behind the scenes
    props.progressHandler(props.prog + 10, score, sound);
    setSound(true);
    setChoice(null);

    //Finish at 10 tests
    if (props.prog + 10 === 100) {
      setPop(true); //Popup appears
      return;
    }
  };

  //User choice handler
  const choiceHandler = (choice) => {
    //Set up choices
    setChoice(choice);
    const card = choice ? cardTrueRef : cardFalseRef;
    const otherCard = choice ? cardFalseRef : cardTrueRef;

    //Change card style if user picked it or not
    card.current.style.border = "4px  rgba(93, 173, 226, 0.5) solid";
    otherCard.current.style.border = "0";
  };

  //Play sound
  const playSound = (sound) => {
    const audioContext = new AudioContext();
    audioContext.resume();

    const audioClip = new Audio(sound);

    const audioClipDuration = 950;
    audioClip.loop = true;
    setTimeout(
      () => (audioClip.loop = false),
      audioClipDuration * (window.value - 1)
    );
    audioClip.play();
  };

  return (
    <>
    {/* Game complete - show completed modal */}
      {pop && (
        <Completed
          objKey={props.objKey}
          currentScores={currentScores}
          score={score * 10}
        />
      )}

      {/* Game unfinished - Sound needs to be shuffled */}
      {soundS && soundHandler()}

      {/* Game unfinished - Sound shuffled - begin game */}
      {!soundS && (
        <div className={classes.bg__container}>
            <BackgroundMusicSelector />

          <section className={classes.activity}>
            {/* Progress Bar */}
            <Progress refSetter={refSetter} />
            <div className={classes.activity__items}>
              <div className={classes.opts}>

                {/* Play sounds for activity */}
                <button
                  className={classes.btn_push_blue}
                  onClick={() => playSound(sound)}
                >
                  🔊
                </button>

                <div
              
              className="activity_instruction"

              >
                 <h3>Click the button above to play the sound</h3>

              </div>



              <div className={classes.activity_instructions}>
                <div className={classes.ind_activity_instruction_1}>
                  <p>If a 1 'a' sound played, click the button below</p>
                </div>

                <div className={classes.ind_activity_instruction_2}>
                  <p>If 3 'a' sounds played, click the button below</p>
                </div>
              </div>

                {/* Player choice cards */}
                <div className={classes.select}>
                  <div
                    className={classes.card}
                    ref={cardTrueRef}
                    onClick={() => choiceHandler(true)}
                  >
                    <div className={classes.card__mid}>
                    <img
                    class = "img"
                      src={require("../../assets/icons/identification_choice_one.png")}
                      alt="ear"
                    />
                      <p> 1 𝖆 Sound</p>
                    </div>
                  </div>
                  <div
                    className={classes.card}
                    ref={cardFalseRef}
                    onClick={() => choiceHandler(false)}
                  >
                    <div className={classes.card__mid}>
                    <img
                    class = "img"
                      src={require("../../assets/icons/identification_choice_three.png")}
                      alt="ear"
                    />
                      <p>3 𝖆 Sound</p>
                    </div>
                  </div>
                </div>

                {/* Check Button */}
                <button
                  className={`${choice !== null ? "btn btn__blue" : "btn"}`}
                  onClick={checkHandler}
                >
                  Check
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default LingIdentificationAvsAAA;
