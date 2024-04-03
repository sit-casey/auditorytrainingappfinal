import { React, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useFetch from "../custHooks/useFetch";
import AuthContext from "../store/auth-context";

import classes from "./cardDB.module.css";

//Purpose: Used in cardsLatest, stores the high score/last visited for activitites
function CardDB(props) {

  //Set state variables
  const [allScores, setAllScores] = useState();
  const [lastVisited, setLastVisited] = useState();

  //Storing locale
  const locale = useContext(AuthContext).locale;

  //fetching the allactivitiesobj from fb db
  const [data, isPending, err] = useFetch("allActivitiesObj", "allGamesObj");
  const [allActivitiesObj, allGamesObj] = data || [];
  // const [[allActivitiesObj], [allGamesObj], isPending, err] = useFetch("allActivitiesObj", "allGamesObj");

  // Now you can use the activities and games arrays in your code


  //Replacing slashes in the key for it to be usable
  const key = `${props.link}`.replaceAll("/", "");

  //Update the last visitted when accessed.
  // useEffect(() => {
  //   setAllScores(allActivitiesObj?.[key].completions.map((comp) => comp.score));
  //   setAllScores(allGamesObj?.[key].completions.map((comp) => comp.score));      //Causing Crashes with Dashboard
  //   setLastVisited(
  //     new Date(allActivitiesObj?.[key].lastVisited).toLocaleDateString(locale),
  //     new Date(allGamesObj?.[key].lastVisited).toLocaleDateString(locale)
  //   );
  // }, [allActivitiesObj, allGamesObj, key, locale]);

  // Update the last visited when accessed.
useEffect(() => {
  if (isPending || err) {
    return; // Handle loading or error state
  }

  const key = `${props.link}`.replaceAll("/", "");
  const activitiesCompletions = allActivitiesObj?.[key]?.completions ?? [];
  const gamesCompletions = allGamesObj?.[key]?.completions ?? [];

  setAllScores(activitiesCompletions.map((comp) => comp.score));
  setLastVisited(
    new Date(allActivitiesObj?.[key]?.lastVisited).toLocaleDateString(locale)
  );
}, [allActivitiesObj, allGamesObj, props.link, locale, isPending, err]);


  //Set up images depending on the link associated with the card
  const imgSetter = () => {
    console.log("props.link:", props.link);
    if (props.link === "/activity/detection") return "audition";
    if (props.link === "/activity/identification") return "extracurricular-activities";
    if (props.link === "/activity/discrimination") return "scale";
    if (props.link === "/activity/comprehension") return "human-mind";
    if (props.link === "/activity/gameActivities/matching") return "card-game";
    return "notes";
  };

  //Update lastVisit var before displaying
  let lastVisit = lastVisited;

  return (
    <>
    {/* TODO: FINISH AND REPLACE FILLER */}
    {/* Confirm allScores to display links, img, high score, and last visited. */}
      {allScores && (
        <Link to={props.link} params={{ testvalue: "hello" }}>
          <div style={{ backgroundColor: props.col }} className={classes.card}>
            
            {/* Image display */}
            <img
              alt=""
              src={require(`../../assets/icons/${imgSetter()}.png`)}
              className={classes.card__img}
            />

            {/* Display title (activity) & last visited */}
            <div className={classes.card__upper}>
              <span>{props.title}</span>
              <span>{`Visited: ${lastVisited}`}</span>
            </div>

            {/* Display high score */}
            <div className={classes.card__lower}>
              <span>High Score:</span>
              <span>{allScores[0] ? `${Math.max(...allScores)}%` : " 0%"}</span>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}

export default CardDB;
