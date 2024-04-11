import { React, useState, useRef, useEffect } from "react";

import _ from "lodash";

import useFetch from "../custHooks/useFetch";
import Progress from "../progressBar/Progress";
import PlayButton from "../playButton/PlayButton";
import Completed from "../Completed/Completed";

import classes from "./lingDiscrimation.module.css";

//Purpose: LingDiscrimination Activity Page
function LingDiscrimination(props) {
    //State variable setup
    const [choice, setChoice] = useState(null);
    const [currentScores, setCurrentScores] = useState([]);
    const [pop, setPop] = useState(false);
    const [soundS, setSound] = useState(true);

    //Fetching activities
    const [[allActivitiesObj], isPending, err] = useFetch("allActivitiesObj");

    //Update current scores for completed modal
    useEffect(() => {
        setCurrentScores(
            allActivitiesObj?.lingActivitydiscrimination?.completions.map(
                (comp) => comp
            )
        );
    }, [allActivitiesObj]);

    useEffect(() => {
        soundHandler();
    }, []);

    //Set up variables for correct/false card.
    const cardTrueRef = useRef(null);
    const cardFalseRef = useRef(null);

    //Set up progress bar
    let progressFGRef;
    const refSetter = (ref) => (progressFGRef = ref);

    //Setting up variables for correct/wrong sound and score
    let score = props.score;
    let sound = props.sound;
    let lingSound = null;
    var sound1;
    var sound2;
    var rightsound =
        "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fchoicesound%2Frightanswer-95219.mp3?alt=media&token=d9168b1b-904c-4af8-8a87-89e0bcbdc582;";
    var wrongsound =
        "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2Fchoicesound%2Fwronganswer-37702.mp3?alt=media&token=ade043bd-c027-4fd6-94ce-3c4c4133182b;";

    //Checks if a and b is equal
    function isSoundEqual(a, b) {
        // if (a === b) return true;
        // return false;
        return a === b;
    }

    //Playing sound function
    const playSound = (sound) => {
        const audioContext = new AudioContext();
        audioContext.resume();

        const audioClip = new Audio(sound);

        const audioClipDuration = 1000;
        audioClip.loop = true;
        setTimeout(() => (audioClip.loop = false), audioClipDuration * (1 - 1));
        audioClip.play();
    };

    //Playing the correct sound functin
    const playRightSound = (rightsound) => {
        const audioContext = new AudioContext();
        audioContext.resume();

        const audioClip = new Audio(rightsound);

        const audioClipDuration = 1000;
        audioClip.loop = true;
        setTimeout(() => (audioClip.loop = false), audioClipDuration * (1 - 1));
        audioClip.play();
    };

    //Playing the incorrect sound
    const playwrongSound = (wrongsound) => {
        const audioContext = new AudioContext();
        audioContext.resume();

        const audioClip = new Audio(wrongsound);

        const audioClipDuration = 1000;
        audioClip.loop = true;
        setTimeout(() => (audioClip.loop = false), audioClipDuration * (1 - 1));
        audioClip.play();
    };

    //Handler for sound
    function soundHandler() {
        //Confirm sound is not null
        if (soundS) {
            //Randomize sound played
            if (props.arr[0][1]) {
                sound1 =
                    props.arr[Math.floor(Math.random() * props.arr.length)][1];
            }
            window.sound1 = sound1;
            if (props.arr[0][1]) {
                sound2 =
                    props.arr[Math.floor(Math.random() * props.arr.length)][1];
            }
            window.sound2 = sound2;
            setSound(false);
        }
        if (!soundS) {
            return;
        }
    }

    //Checking if the user is correct
    const checkHandler = async () => {
        const card = choice ? cardTrueRef : cardFalseRef;

        //No card was selected before the check
        if (choice === null) return;

        //Correct choice
        if (
            (choice && isSoundEqual(window.sound1, window.sound2)) ||
            (choice === false && !isSoundEqual(window.sound1, window.sound2))
        ) {
            score += 1;
            card.current.style.border = "8px green solid";
            playRightSound(rightsound);
        }

        //Incorrect choice
        if (
            (choice && !isSoundEqual(window.sound1, window.sound2)) ||
            (choice === false && isSoundEqual(window.sound1, window.sound2))
        ) {
            card.current.style.border = "8px red solid";
            playwrongSound(wrongsound);
        }

        //Update progress
        progressFGRef.current.style.width = `${props.prog + 10}%`;

        //Timeout between questions, refresh UI
        setTimeout(() => {
            cardTrueRef.current.style.border = "0";
            cardFalseRef.current.style.border = "0";
        }, 300);

        //Update progress internally
        props.progressHandler(props.prog + 10, score, sound);
        setSound(true);
        setChoice(null);

        //Finish at 10 tests
        if (props.prog + 10 === 100) {
            setPop(true); //Popup triggered
            return;
        }
    };

    //Handler for user picking a card
    const choiceHandler = (choice) => {
        setChoice(choice);
        const card = choice ? cardTrueRef : cardFalseRef;
        const otherCard = choice ? cardFalseRef : cardTrueRef;

        card.current.style.border = "4px  rgba(93, 173, 226, 0.5) solid";
        otherCard.current.style.border = "0";
    };

    return (
        <>
            {/* User has completed activity - display modal and completed */}
            {pop && (
                <Completed
                    objKey={props.objKey}
                    currentScores={currentScores}
                    score={score * 10}
                />
            )}

            {/* If soundS is available, then soundHandler */}
            {soundS && soundHandler()}

            {/* Actual Game */}
            {!soundS && (
                <div className={classes.bg__container}>
                    <section className={classes.activity}>
                        {/* Progress bar */}
                        <div className={classes.activity__items}>
                            <div className={classes.opts}>
                                {/* Play sound buttons */}
                                <div className={classes.sound_btn_container}>
                                    <button
                                        className={classes.btn_push_blue}
                                        onClick={() => {
                                            if (!window.sound1) {
                                                window.sound1 =
                                                    props.arr[
                                                        Math.floor(
                                                            Math.random() *
                                                                props.arr.length
                                                        )
                                                    ][1];
                                            }
                                            playSound(window.sound1);
                                        }}
                                    >
                                        🔊
                                    </button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button
                                        className={classes.btn_push_blue}
                                        onClick={() => {
                                            if (!window.sound2) {
                                                window.sound2 =
                                                    props.arr[
                                                        Math.floor(
                                                            Math.random() *
                                                                props.arr.length
                                                        )
                                                    ][1];
                                            }

                                            playSound(window.sound2);
                                        }}
                                    >
                                        🔊
                                    </button>
                                </div>

                                <div className="activity_instruction">
                                    <h3>
                                        Click each button above to play the
                                        sounds
                                    </h3>
                                </div>

                                <div className={classes.activity_instructions}>
                                    <div
                                        className={
                                            classes.ind_activity_instruction_1
                                        }
                                    >
                                        <p>
                                            If both sounds were the same, click
                                            the button below
                                        </p>
                                    </div>

                                    <div
                                        className={
                                            classes.ind_activity_instruction_2
                                        }
                                    >
                                        <p>
                                            If both sounds were different, click
                                            the button below
                                        </p>
                                    </div>
                                </div>

                                <div className={classes.select}>
                                    {/* User choice */}
                                    <div
                                        className={classes.card}
                                        ref={cardTrueRef}
                                        onClick={() => choiceHandler(true)}
                                    >
                                        <div className={classes.card__mid}>
                                            <img
                                                class="img"
                                                src={require("../../assets/icons/discrimination_choice_same.png")}
                                                alt="ear"
                                            />
                                            <p> Same Sound</p>
                                        </div>
                                    </div>
                                    <div
                                        className={classes.card}
                                        ref={cardFalseRef}
                                        onClick={() => choiceHandler(false)}
                                    >
                                        <div className={classes.card__mid}>
                                            <img
                                                class="img"
                                                src={require("../../assets/icons/discrimination_choice_diff.png")}
                                                alt="ear"
                                            />
                                            <p>Diff Sound</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Check if the user is correct */}
                                <button
                                    className={`${
                                        choice !== null
                                            ? "btn btn__blue"
                                            : "btn"
                                    }`}
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

export default LingDiscrimination;
