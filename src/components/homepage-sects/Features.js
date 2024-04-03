import React from "react";

import classes from "./features.module.css";
import styles from "./sections.module.css";
import detectionImage from '../../assets/images/person-pc.png';
import discriminationImage from '../../assets/images/kid-comprehension.png';
import identificationImage from '../../assets/images/kid-identification.png';
import forumImage from '../../assets/images/forum.webp';

//Purpose: Display the different features, description, and picture
function Features() {
  //This array will likely be handled by a database in the future

  const featuresArr = [
    {
      title: "Detection",
      detail:
        " In this mission, you will either be presented with a sound or silence. Although you may not hear anything, it’s not a trick! Try your best to choose the best option of what you’re presented with.",
      pic: "test-sound",
      picAlt: "description of the image for SEO",
      imagePath: detectionImage,
    },
    {
      title: "Discrimination",
      detail:
        "In this mission, you will be presented with two sounds and will be asked to select whether the sounds are the same or different.",
      pic: "test-choice",
      picAlt: "description of the image for SEO",
      imagePath: discriminationImage,
    },
    {
      title: "Identification",
      detail:
        "In this mission, you will hear sounds of varying lengths and loudness levels. You will also hear words of varying lengths and voices and asked to identify the correct option.",
      pic: "test-identify",
      picAlt: "description of the image for SEO",
      imagePath: identificationImage,
    },
    {
      title: "Forum",
      detail:
        "In this mission, you will hear sounds of varying lengths and loudness levels. You will also hear words of varying lengths and voices and asked to identify the correct option.",
      pic: "test-identify",
      picAlt: "description of the image for SEO",
      imagePath: forumImage,
    },
  ];

  return (
    <section className={styles.section_features} id="section--1">
      {/* Title */}
      
      <div className={styles.section__title}>
        <hr />
        <h2>Our Features</h2>
        <hr />
      </div>

      {/* Display features available along with img */}
      <div className={classes.feature__cards}>
        {featuresArr.map((feat, i) => {
          return (
            <div className={classes.feature__card} key={i} style={{backgroundImage: `url(${feat.imagePath})`,}}>
              <div className={classes.info}> 
                <h1 className={classes.card__header}>{feat.title}</h1>
                <p className={classes.card__text}>{feat.detail}</p>
                
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Features;
