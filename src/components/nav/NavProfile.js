import { React, useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../store/auth-context";
import useFetch from "../custHooks/useFetch";
import classes from "./nav.module.css";

//Purpose: Profile corner of nav bar
function NavProfile() {
  //Retrieve name
  const [[fName], isPending, err] = useFetch("fName", "lName");

  const authContext = useContext(AuthContext);

  return (
    <div className={classes.nav__right}>
      <div className={classes.profile__items}>
        {/* Error catching */}
        {err ? (
          "Firebase Document Not Found!"
        ) : (
          // Otherwise, profile pic and name
          <div className={classes.profile__pic_name}>
            <span className={classes.profile__text}>{fName}</span>
            <div className={classes.img__container}>
              <img
                className={classes.profile__img}
                src={require("../../assets/images/user (1).png")}
                alt="profile"
              />
            </div>
          </div>
        )}

        {/* Link to profile */}
        <ul className={classes.list__container}>
          <Link to="/myprofile">
            <li className={classes.list__item}>
              <span>My Profile</span>
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
              <span>Settings</span>
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
              <span>Logout</span>
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