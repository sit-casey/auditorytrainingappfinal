import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import AuthContext from "../store/auth-context";
import { db } from "../../firebase-config";
import { allActivities } from "../../helpers/allActivities";
import { allGames } from "../../helpers/allGames";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import classes from "./authForm.module.css";

// Purpose: Log in the user and set the data according to saved user settings
function AuthForm(props) {

  //State Hook variable setup for loading state
  const [isLogin, setIsLogin] = useState(props.signIn);
  const [isReset, setIsReset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //Initial values for variables = null
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const birthDateRef = useRef();
  const genderRef1 = useRef();
  const genderRef2 = useRef();

  //Navigate hook
  const navigate = useNavigate();

  //Authorization hook
  const authContext = useContext(AuthContext);

  //Set State for regions
  const [country, setCountry] = useState(null);
  const [region, setRegion] = useState(null);

  //Invert previous state
  const switchHandler = (e) => {
    e.preventDefault();
    setIsLogin((prevState) => !prevState);
  };

  const apiKey = "AIzaSyC85rsx-Nb7HYh6uX5HKHd17zboiuwiWUI";

  //Initialize variables
  let allActivitiesObj = {};
  let allGamesObj = {};
  const activities = { completions: [], lastVisited: "" };
  const games = { completions: [], lastVisited: "" };

  //Setting up obj links
  Object.entries(allActivities).forEach((activityGroup) => {
    activityGroup[1].forEach((activity) => {
      const newObj = { [activity.link.replaceAll("/", "")]: { ...activities } };
      allActivitiesObj = { ...allActivitiesObj, ...newObj };
    });
  });

  Object.entries(allGames).forEach((gameGroup) => {
    gameGroup[1].forEach((game) => {
      const newObj = { [game.link.replaceAll("/", "")]: { ...games } };
      allGamesObj = { ...allGamesObj, ...newObj };
    });
  });

  //What happens when information is submitted
  const submitHandler = (e) => {
    e.preventDefault();

    //Resets pw if the flag is triggered
    if (isReset) {
      resetPassword();
      return;
    }

    //Update the values according to input (initially null)
    var enteredEmail = emailInputRef.current.value;
    var enteredPassword = passwordInputRef.current.value;
    var enteredFname = isLogin ? "" : firstNameInputRef.current.value;
    var enteredLname = isLogin ? "" : lastNameInputRef.current.value;
    var enteredCountry = country;
    var enteredRegion = region;

    //Defaults
    var defaultProfilePic =
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/profilePictures%2Fdefault%2Fdefault.jpg?alt=media&token=276e66bb-1827-403b-bb6a-839d6cb9916b";
    var defaultAboutMe = "";
    var defaultAboutHearingLoss = "";
    var enteredBirthDate = null;
    var enteredGender1 = null;
    var enteredGender2 = null;
    if (!isLogin) {
      enteredBirthDate = birthDateRef.current.value;
      enteredGender1 = genderRef1.current.value;
      enteredGender2 = genderRef2.current.value;
    }

    //Show loading for feedback
    setIsLoading(true);
    
    //Changes URL depending if the user is logged in or not.
    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    }

    //sending POST req
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        //No longer loading
        setIsLoading(false);
        //Confirm response is ok
        if (res.ok) {
          return res.json();
        } else {
          //catch error
          return res.json().then((data) => {
            let errorMessage = "Whoops: ";
            if (data?.error.message)
              errorMessage += data.error.message.toLowerCase();
            throw errorMessage;
          });
        }
      })
      .then((data) => {
        setIsLoading(true);
        //sign up and store basic user info on the users doc in Firebase
        if (!isLogin) {
          const userData = {
            fName: enteredFname,
            lName: enteredLname,
            email: enteredEmail,
            profilePic: defaultProfilePic,
            aboutMe: defaultAboutMe,
            aboutHearingLoss: defaultAboutHearingLoss,
            country: enteredCountry,
            region: enteredRegion,
            birthDate: enteredBirthDate,
            genderPronoun1: enteredGender1,
            genderPronoun2: enteredGender2,
            privateAge: false,
            privateLocation: false,
            privatePronouns: false,
            latestActivities: [],
            allActivitiesObj,
            allGamesObj,
          };
          //Updating db
          const UId = doc(db, `users/${data.localId}`);
          setDoc(UId, userData);
        }
        //sign in
        localStorage.setItem("user", data.localId.toString());
        const expTime = new Date(new Date().getTime() + +data.expiresIn * 1000);
        authContext.login(data.idToken, expTime);
        navigate("/", { replace: true });
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.replaceAll("_", " ") + "!");
      });
  };

  //Reset pw handler
  const resetPassword = () => {
    //Retrieve associated email
    const auth = getAuth();
    const enteredEmail = emailInputRef.current.value;

    //Send request for reset w/ associated email
    sendPasswordResetEmail(auth, enteredEmail)
      .then(() => {
        //Navigate to reset page
        navigate("/reset", { replace: true });
      })
      //Catch error and display to user
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage.replaceAll("_", " ") + "!");
      });
  };


  return (
    <div className={classes.form__container}>
      {/* Submit form using handler described above */}
      <form onSubmit={submitHandler} className={classes.form}>

        {/* Check if this is a pw reset or a login page */}
        <h2 className={classes.form__header}>
          {isReset ? "Password Reset" : isLogin ? "Sign In" : "Sign Up"}
        </h2>
        
        {/* If this is a reset, display the following */}
        {isReset && (
          <p className={classes.reset__prompt}>
            Please enter your email address below, and a link to reset your
            password will be sent your email.
          </p>
        )}

        {/* User is not logged in, display input form for First name */}
        {!isLogin && (
          <div className={classes.form__group}>
            <input
              className={classes.form__input}
              id="first-name"
              type="text"
              placeholder="First Name"
              required
              ref={firstNameInputRef}
            />
            <label className={classes.form__label} htmlFor="first-name"></label>
          </div>
        )}

        {/* User is not logged in, display input form for last name */}
        {!isLogin && (
          <div className={classes.form__group}>
            <input
              className={classes.form__input}
              id="last-name"
              type="text"
              placeholder="Last Name"
              required
              ref={lastNameInputRef}
            />
          </div>
        )}

        {/* Input  for emails - setting up email input*/}
        <div className={classes.form__group}>
          <input
            className={classes.form__input}
            id="email"
            type="email"
            placeholder="Email Address"
            required
            ref={emailInputRef}
          />
        </div>

        {/* Not pw reset - input for pw first time */}
        {!isReset && (
          <div className={classes.form__group}>
            <input
              className={classes.form__input}
              id="password"
              type="password"
              placeholder="Password"
              minLength="6"
              required
              ref={passwordInputRef}
            />
          </div>
        )}

        {/* Not logged in - pick country and region */}
        {!isLogin && (
          <div className={classes.form__group}>

            {/* Component called for dropdown from react */}
            <p>Country and Region:</p>
            <CountryDropdown
              className={classes.form__input}
              value={country}
              onChange={(val) => setCountry(val)}
            />
            {/* Region component dropdown component called from react */}
            <RegionDropdown
              className={classes.form__input}
              country={country}
              value={region}
              onChange={(val) => setRegion(val)}
            />

            {/* Set birthday for user */}
            <p>Birth Date:</p>
            <input
              className={classes.form__input}
              type="date"
              ref={birthDateRef}
            ></input>

            {/* TODO: Modernize selections.
            Set gender pronouns for user */}
            <p>Gender Pronouns:</p>
            <select className={classes.form__input} ref={genderRef1}>
              <option value="She">She</option>
              <option value="He">He</option>
              <option value="They">They</option>
              <option value="Zie">Zie</option>
              <option value="Sie">Sie</option>
              <option value="Ey">Ey</option>
              <option value="Ve">Ve</option>
              <option value="Tey">Tey</option>
              <option value="E">E</option>
            </select>
            <select className={classes.form__input} ref={genderRef2}>
              <option value="Her">Her</option>
              <option value="Him">Him</option>
              <option value="Them">Them</option>
              <option value="Zim">Zim</option>
              <option value="Sie">Sie</option>
              <option value="Em">Em</option>
              <option value="Ver">Ver</option>
              <option value="Ter">Ter</option>
              <option value="Em">Em</option>
            </select>
          </div>
        )}

        {/* Shows up if user is logged in*/}
        {isLogin && (
          <div className={classes.form__group}>
            {/* Check if reset has been clicked, and update accordingly */}
            <span
              onClick={() => setIsReset(!isReset)}
              className={classes.span_underline}
            >
              {isReset ? "Sign In?" : "Forgot Password?"}
            </span>
          </div>
        )}

        <div className={classes.form__group}>
          {/* Check if loading - if not, then display reset/login depending on login/reset status */}
          {!isLoading ? (
            <button className="btn btn__yellow">
              {isReset ? "Reset Password" : isLogin ? "Sign In" : "Sign Up"}
              &rarr;
            </button>
          ) : (
            // Is loading - display loading img
            <div className={classes.loader}></div>
          )}
        </div>
        {/* End forum */}
      </form> 

      {/* If an error occurs */}
      {error && <p>{`${error}`}</p>}
      <div className={classes.form__switcher}>
        {/* Text that changes depending if reset is triggered or not */}
        <p onClick={switchHandler}>
          {isReset ? "" : 
              isLogin && (
                <span>
                  Don't have an account?
                  <span className={classes.span_underline}>Sign Up</span>
                </span>
              )}
          {/* If not logged in display the following text */}
          {!isLogin && (
            <span>
              Already have an account?
              <span className={classes.span_underline}>Sign In</span>
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
