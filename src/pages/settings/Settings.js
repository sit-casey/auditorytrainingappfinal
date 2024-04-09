import Nav from "../../components/nav/Nav";
import classes from "./settings.module.css";
import { EmailAuthProvider } from "firebase/auth";
import React, { useRef, useState, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
//import styled from "styled-components";
import { useAuth } from "../../../src/components/store/auth-context";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import { ThemeContext } from "../../App";
import ReactSwitch from "react-switch";

import logoLight from "../../../src/assets/images/settings-page-light.jpg"; // Tell webpack this JS file uses this image 
import logoDark from "../../../src/assets/images/settings-page-dark.png"; // Tell webpack this JS file uses this image 
import { colors } from "@mui/material";


function Settings() {
  ////////// Code to change the email and the password of the user//////////
  const emailRef = useRef();
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const newPasswordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

 

  function reauthenticate(currentPassword) {
    console.log("currentPassword in reauthenticate", currentPassword);
    let credential = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      currentPassword
    );
    return currentUser.reauthenticateWithCredential(credential);
  }

  function handleSubmit(event) {
    event.preventDefault();
    reauthenticate(currentPasswordRef.current.value)
      .then(() => {
        if (
          newPasswordRef.current.value !== newPasswordConfirmRef.current.value
        ) {
          return setError("Passwords do not match");
        }
        const promises = [];
        setError("");
        setLoading(true);
        if (emailRef.current.value !== currentUser.email) {
          promises.push(updateEmail(emailRef.current.value));
        }
        if (newPasswordRef.current.value) {
          promises.push(updatePassword(newPasswordRef.current.value));
        }

        Promise.all(promises)
          .then(() => {
            setMessage(
              "Account settings updated. Redirecting to your profile!"
            );
            setTimeout(() => {
              history.push("/");
            }, 3000);
          })
          .catch(() => {
            setError("Failed to update account");
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((error) => {
        setError("Current password is incorrect");
      });
  }

  function selectText(event) {
    const input = event.target;
    input.focus();
    input.select();
  }

  //

  let a;
  function hideEye1() {
    if (a === 1) {
      document.getElementById("P1").type = "password";
      document.getElementById("E1").src = "eye-hide.png";
      a = 0;
    } else {
      document.getElementById("P1").type = "text";
      document.getElementById("E1").src = "eye-view.png";
      a = 1;
    }
  }

  let b;
  function hideEye2() {
    if (b === 1) {
      document.getElementById("P2").type = "password";
      document.getElementById("E2").src = "eye-hide.png";
      b = 0;
    } else {
      document.getElementById("P2").type = "text";
      document.getElementById("E2").src = "eye-view.png";
      b = 1;
    }
  }

  let c;
  function hideEye3() {
    if (c === 1) {
      document.getElementById("P3").type = "password";
      document.getElementById("E3").src = "eye-hide.png";
      c = 0;
    } else {
      document.getElementById("P3").type = "text";
      document.getElementById("E3").src = "eye-view.png";
      c = 1;
    }
  }

  ///////////// Themes /////////////
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log("The value of theme (Settings) is " + theme);
  //////////////////////////////////

  return (
    <>
      <Nav />
      <div
        className={
          theme === "light" ? classes.settings_light : classes.settings_dark
         
        }
      >

      <h1 className={classes.header__title}>Settings</h1>


      </div>      
     
      <div
        className={
          theme === "light"
            ? classes.main_container_light
            : classes.main_container_dark
            
        }
      >
        
        {/* <div className={classes.main_container_light} id={theme}> */}

        {/* <Card> */}
        <Card.Body
          className={
            theme === "light" ? classes.card_body_light : classes.card_body_dark
          }
        >
          <div className={classes.switch}>
          </div>
          {/* <h2 className="text-center mb-4">Update Profile</h2> */}
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form className={classes.form} onSubmit={handleSubmit}>
            {/* <Form> */}
            <Form.Group id="email">
              <Form.Label>
                <h4>Email</h4>
              </Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                onClick={(event) => selectText(event)}
                // defaultValue={currentUser.email}
              />
            </Form.Group>
            
            <Form.Group id="currentPassword">
              <Form.Label>
                <h4>Current Password</h4>
              </Form.Label>
              <Form.Control
                type="password"
                ref={currentPasswordRef}
                placeholder="Enter current password"
                required
                onClick={(event) => selectText(event)}
                id="P1"
              />
              <img
                className={classes.image}
                src="eye-hide.png"
                onClick={hideEye1}
                id="E1"
                alt="eye"
              ></img>
            </Form.Group>
            <Form.Group id="newpassword">
              <Form.Label>
                <h4>New Password</h4>
              </Form.Label>
              <Form.Control
                type="password"
                ref={newPasswordRef}
                placeholder="Leave blank to keep the same"
                onClick={(event) => selectText(event)}
                id="P2"
              />
              <img
                className={classes.image}
                src="eye-hide.png"
                onClick={hideEye2}
                id="E2"
                alt="eye"
              ></img>
            </Form.Group>
            <Form.Group id="newPasswordConfirm">
              <Form.Label>
                <h4 style={{ color: ""}}>Confirm New Password</h4>
              </Form.Label>
              <Form.Control
                type="password"
                ref={newPasswordConfirmRef}
                placeholder="Leave blank to keep the same"
                onClick={(event) => selectText(event)}
                id="P3"
              />
              <img
                className={classes.image}
                src="eye-hide.png"
                onClick={hideEye3}
                id="E3"
                alt="eye"  
              ></img>   
            </Form.Group>
            {/* <Button disabled={loading} className="w-100" type="submit"> */}
            <Button
              disabled={loading}
              className={classes.password_button}
              type="submit"
            >
              Save Preferences 
            </Button>
          </Form>
        </Card.Body>
        {/* </Card> */}
 
       
       {/* Conditional rendering for logo */}
       <div className={classes.logobutton}>
          {theme === "light" ? (
            <img src={logoLight} alt="Light Mode Logo" />
          ) : (
            <img src={logoDark} alt="Dark Mode Logo" />
          )}
        </div>
      
        <div className="w-100 text-center mt-2">
        
      
          {/* <Link to="/">Cancel</Link> */}
        </div>
        

      </div>
    </>
  );
}

export default Settings;
