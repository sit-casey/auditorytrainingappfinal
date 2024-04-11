


import { React, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import AuthContext from "../store/auth-context";
import classes from "./nav.module.css";


function NavProfile() {
  // State to hold fetched user data including the profile picture URL
  const [userData, setUserData] = useState(null);
  const user = useContext(AuthContext).fbUser; 
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        try {
          // Directly use split to extract the document ID, ensuring no duplication of 'users'
          const userId = user.split('/')[1]; 
  
          const userDocRef = doc(db, "users", userId);
  
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    getUserData();
  }, [user]);
  // Ensure user data and profile picture URL are loaded
  const profilePictureUrl = userData ? userData.profilePic : require("../../assets/icons/profile.png");

  return (
    <div className={classes.nav__right}>
      <div className={classes.profile__items}>
        {userData ? (
          <div className={classes.profile__pic_name}>
            <div className={classes.img__container}>
              <img
                className={classes.profile__img}
                src={profilePictureUrl} // Use the profile picture URL from state
                alt="Profile"
              />
            </div>
            <span className={classes.profile__text}>{userData.fName} </span>
            <span className={classes.profile__text}>{userData.lName} </span>
          </div>
        ) : (
          "Loading..."
        )}
        {/* Link to profile */}
        <ul className={classes.list__container}>
          <Link to="/myprofile">
            <li className={classes.list__item}>
              <span className={classes.list_span}>My Profile</span>
              <img
                className={classes.ul__img}
                src={require("../../assets/icons/profile.png")}
                alt="settings"
              />
            </li>
          </Link>

          {/* Link to setting*/}
          <Link to="/settings">
            <li className={classes.list__item}>
              <span className={classes.list_span}>Settings</span>
              <img
                className={classes.ul__img}
                src={require("../../assets/icons/settings.png")}
                alt="settings"
              />
            </li>
          </Link>

          {/* Log out and end up at dashboard */}
          <Link to="/dashboard">
            <li className={classes.list__item} onClick={authContext.logout}>
              <span className={classes.list_span}>Logout</span>
              <img
                className={classes.ul__img}
                src={require("../../assets/icons/logout.png")}
                alt="logout"
              />
            </li>
          </Link>
        </ul>
      </div>

      {/* Notification icon */}
      {/* TODO: FUNCTIONALITY */}
      <img
        className={classes.notification__img}
        src={require("../../assets/icons/notification.png")}
        alt="profile"
      />
    </div>
  );
}

export default NavProfile;