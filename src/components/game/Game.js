import { React, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { updateDoc, getDoc, doc } from "firebase/firestore";

import { db } from "../../firebase-config";
import AuthContext from "../store/auth-context";
import useFetch from "../custHooks/useFetch";

import classes from "./acts.module.css";

/*Actual Game being called in Activities.js/ActivityPage.js */
function Game(props) {

  //fetching user's latest activities from db - check db schema
  const [[userData], isPending, err] = useFetch("latestActivities");

  //user = current fb user logged in
  const user = useContext(AuthContext).fbUser;

  //key = dot annotation to access correct info within user info
  const key = `${props.link}`.replaceAll("/", "");

  //method to set the latest activity performed by the user.
  const setLatest = () => {
    const UId = doc(db, user);

    //if activity was already the latest activity, only update its lastVisited time
    if (userData[0] && props.link === userData[0].link) {
      updateDoc(UId, {
        [`allGamesObj.${key}.lastVisited`]: new Date().toISOString(),
      });
      return;
    }

    //New latest activity
    const newUserData = userData.filter((data, i) => {
      if (props.link !== data.link) return data;
      return null;
    });

    //Update db with latest activity
    updateDoc(UId, {
      [`allGamesObj.${key}.lastVisited`]: new Date().toISOString(),
      latestActivities: [
        { title: props.title, link: props.link },
        newUserData[0] || "",
        newUserData[1] || "",
      ],
    });
  };

  //Display - the actual information within the cards of Activities.js
  return (
    <>
      {/* Links to associated options link */}
      <Link to={props.link}>
        <div className={classes.activity__container}>
          <figure className={classes.col_1}>
            
            {/* Image */}
            <img
              className={classes.col_1_img}
              src={require(`../../assets/icons/${props.src}.png`)}
              alt="Error"
            />
            
            {/* Description and Title */}
            <figcaption className={classes.info}>
              <span className={classes.main__info}> {props.title}<br></br></span>
              <span className={classes.sub__info}>
                {props.desc}
              </span>
            </figcaption>
          </figure>
        </div>
      </Link>
    </>
  );
}

export default Game;//
