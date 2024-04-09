import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./header.module.css";

function Header() {
  const [blurValue, setBlurValue] = useState(0); // Stores the current blur value for backdrop-filter

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const newBlurValue = Math.min(50, scrollPosition / 30); // Adjust these values as needed
    setBlurValue(newBlurValue);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={classes.header} >
      
      <div
        className={classes.header__title}
        style={{ backdropFilter: `blur(${blurValue}px)`}} 
      >
        <div>
          <h1 style={{ color: "white", marginBottom: "120px"}}>
            Helping<span className={classes.highlight}> hearing</span> loss
            <br/>
            with<span className={classes.highlight}> activities</span>
          </h1>
        </div>
        <h4 >A simpler way of practicing</h4>
        <Link to="/auth" state={{ signIn: false }}>
          <button className="letsstartbutton">Let's start</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
