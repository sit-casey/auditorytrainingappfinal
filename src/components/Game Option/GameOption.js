import { React, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";


import classes from "./act.module.css";

//Purpose: Called by GameOption, the actual display/container for games
function GameOption(props) {

  return (
    <>
      {/* Redirect to the associated link */}
      <Link to={props.link}>
        <div className={classes.activity__container}>
          <figure className={classes.col_1}>

            {/* Display associated image */}
            <img
              className={classes.col_1_img}
              src={require(`../../assets/icons/${props.src}.png`)}
              alt="Error"
            />
            
            {/* Game Description and title */}
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

export default GameOption;
