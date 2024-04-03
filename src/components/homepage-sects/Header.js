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
    <header className={classes.header} style={{transform: "skewY(-2deg)" }}>
      
      <div
        className={classes.header__title}
        style={{ backdropFilter: `blur(${blurValue}px)`, boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px"}} 
      >
        <div>
          <h1 style={{ color: "white", marginBottom: "120px", transform: "skewY(2deg)" }}>
            Helping<span className={classes.highlight}> hearing</span> loss
            <br/>
            with<span className={classes.highlight}> activities</span>
          </h1>
        </div>
        <h4 style={{transform: "skewY(2deg)" }}>A simpler way of practicing</h4>
        <Link to="/auth" state={{ signIn: false }}>
          <button style={{transform: "skewY(2deg)" }} className="letsstartbutton">Let's start</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
