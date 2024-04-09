import React, { useState } from "react";

import classes from "./userMission.module.css";
import styles from "./sections.module.css";

// Purpose: Display user mission in the section
function UserMission() {

  const missionsArr = [
    {
      title: "Exercise",
      detail: "You will be asked to listen, detect, discriminate, identify, and comprehend different sounds, words, phrases, and sentences.",
      pic: "brain", // Add the hover image filename
      picAlt: "description of the image for SEO",
    },
    {
      title: "Master",
      detail: "Your mission is to travel through and master each level of auditory training.",
      pic: "mortarboard", // Add the hover image filename
      picAlt: "description of the image for SEO",
    },
    {
      title: "Fun",
      detail: "Above all, your main mission is to have fun!",
      pic: "confetti", // Add the hover image filename
      picAlt: "description of the image for SEO",
    },
  ];

  return (
    <section className={styles.section_your_mission} id="section--1">
     
        <div className={classes.mission__cards}>
        <div className={classes.card}>
      
        <h2 className={styles.section__title} >Your Mission</h2>
    
            <p className={styles.section__description} >At Mission: Audition!, our platform is designed to cater to the diverse goals and aspirations of individuals with cochlear implants. 
              We understand that each user may have unique needs and objectives, and our mission is to support them every step of the way.  </p>
        {/* Display the user missions on the home page */}
          {missionsArr.map((mission, i) => {
            return (
              <div className={classes.mission__card}
              >
                <div className={classes.mission__card__info}>
                  <img
                    src={require(`../../assets/icons/${mission.pic}.png`)}
                    alt={mission.picAlt}
                    className={classes.mission__card__img}
                  />
                  <h5 className={classes.mission__card__header}>{mission.title}</h5>
                  <p className={classes.mission__card__text}>{mission.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
  </section>
  );
}

export default UserMission;