import React from "react";
import image from '../../assets/images/aalfano.jpg'
import classes from "./mission.module.css";
import styles from "./sections.module.css";

//Purpose: Mission segment 
function Mission() {
  return (
    <>
      <section className={styles.section_mission} id="section--2" style={{marginTop:"10rem",}}> 
        <div className={styles.section__title}>
          <h2 style={{marginBottom:"5rem", color: "white",
            position: "relative",
            padding: "0.5rem 1.5rem",
            clipPath: "polygon(7% 0, 100% 0, 93% 100%, 0 100%)",
            background: "rgba(var(--main-blue))",
            }}>Our Mission</h2>
        </div>
          <div className={classes.mission} >
            <div className={classes.feature__card} 
              style={{
                backgroundImage: `url(${image})`,  
                backgroundSize: "cover", 
                backgroundPosition: "center", 
                backgroundRepeat: "no-repeat",   
              }}> 
              <div className={classes.info}> 
                <h1 className={classes.card__header}> Dr. Alliete Alfano</h1>
                <p className={classes.card__text}> Dr. Alfano is a bilingual speech-language pathologist and LSLS Certified Auditory-Verbal Therapist with over 25 years of clinical experience. In addition to attending both children and adults at The Alfano Center, she is an assistant professor in the Department of Communication Sciences and Disorders at Florida International University where she has been teaching since 2010.</p> 
              </div>
            </div>
              <div className={classes.section__title}> 
                <p className={classes.section__description}>  
                Mission: Audition! is a pioneering auditory training application specifically crafted to enhance the hearing capabilities of individuals using cochlear implants. Recognizing the unique challenges faced by cochlear implant users in decoding and understanding sounds, this application offers a comprehensive training program tailored to their needs. Through a meticulously designed curriculum, users are exposed to a wide range of auditory exercises that progressively improve their ability to identify various sounds, from simple tones to complex environmental noises.

                The application delves deeper into language comprehension by including exercises aimed at recognizing and differentiating words, phrases, and sentences. Personalization is at the heart of the application, allowing users to adjust the training modules according to their individual progress and preferences. This personalized approach ensures that each user's journey through auditory rehabilitation is optimized for their specific hearing profile.

                To complement the auditory training, Mission: Audition! it's a comprehensive auditory training ecosystem designed to transform the lives of cochlear implant users.</p>{" "}
              </div>
          </div>
      </section>
    </>
  );
}

export default Mission;
