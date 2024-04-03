import { React } from "react";

import Activity from "../activity/Activity";

import classes from "./acts.module.css";

/*
Purpose: Display for Activities Page. Contains the information to pass to cards (Activity) on the page.
Focuses on "ALl Activities" Section. To Edit "Recent Activities", refer back to ActivityPage.js
*/
function Activities(props) {

  //Handles the color coded difficulty.
  const lvlColorHandler = (lvl) => {
    if (lvl === 1) return `1`;
    if (lvl === 2) return `2`;
    if (lvl === 3) return `3`;
    if (lvl === 4) return `4`;
    return `N/A`;
  };

  return (
    <div className={classes.acts__container}>
      <h3>All Activities</h3>
      <div className={classes.acts__title}>
     
      </div>

      <div className={classes.display}>
      {/* Retrieves list of activities from Actiivity helper*/}
        {props.activitiesArr.map((card, i) => (

          // Actual activity object that displays each individual card
          <Activity
            key={i}
            title={card.title}
            src={card.src}
            link={card.link} //Adjust link to new
            level={lvlColorHandler(card.level)}
            desc={card.desc}
          />
        ))}
      </div>
    </div>
  );
}

export default Activities;
