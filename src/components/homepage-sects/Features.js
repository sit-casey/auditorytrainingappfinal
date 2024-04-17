import React from "react";

import classes from "./features.module.css";
import styles from "./sections.module.css";
import detectionImage from '../../assets/images/person-pc.png';
import discriminationImage from '../../assets/images/discrimination.png';
import forumImage from '../../assets/images/forum.webp';

//Purpose: Display the different features, description, and picture
function Features() {
  //This array will likely be handled by a database in the future

  const featuresArr = [
    {
      title: "Games",
      detail:
        " Our app elevates your experience by incorporating interactive mini-games designed to both entertain and engage. Test your auditory recall with our Audio Memory game, challenge your pattern recognition skills with Matching puzzles, and expand your vocabulary with our Crossword challenges. These fun and stimulating games not only provide a delightful diversion but also sharpen your cognitive abilities, making every moment spent on our app both enjoyable and enriching.",
      pic: "test-sound",
      picAlt: "headphones smiling girl",
      imagePath: detectionImage,
    },
    {
      title: "Drill Activities",
      detail:
        " Explore our auditory drills, each crafted to enhance your listening skills. Begin with the Detection Drill, recognizing sound presence. Progress to the Discrimination Drill to distinguish sounds. In the Identification Drill, count the sounds. Conclude with the Comprehension Drill, interpreting and answering questions. This concise suite offers a comprehensive auditory skill-building journey.",
      pic: "test-choice",
      picAlt: "description of the image for SEO",
      imagePath: discriminationImage,
    },
    {
      title: "Forum",
      detail:
        " A dynamic space designed for connection, learning, and sharing. Here, you can engage in interactive threads tailored to a wide range of topics, personalize your profile to match your interests, and access a wealth of resources. Whether you're here to find answers, share knowledge, or simply connect with like-minded individuals, our forum features are crafted to enhance your experience and foster a vibrant community.",
      pic: "test-identify",
      picAlt: "description of the image for SEO",
      imagePath: forumImage,
    },
  ];

  return (
    <section className={styles.section_features} id="section--1">
      {/* Title */}
      
      <div className={styles.section__title}>
        <h2 style={{
          color: "white",
          position: "relative",
    padding: "0.5rem 1.5rem",
    clipPath: "polygon(7% 0, 100% 0, 93% 100%, 0 100%)",
    background: "rgba(var(--main-blue))",
    fontSize: "100%",}}>Our Features</h2>
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
