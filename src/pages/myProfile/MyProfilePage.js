import { React, useEffect, useState, useContext, useRef } from "react";
import AuthContext from "../../components/store/auth-context";
import Nav from "../../components/nav/Nav";
import { db } from "../../firebase-config";
import { updateDoc, getDoc, doc } from "firebase/firestore";
import classes from "./myProfile.module.css";
import { storage } from "../../firebase-config";
import { initializeApp } from "firebase/app";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { Margin, Padding } from "@mui/icons-material";

//Profile page
function MyProfilePage() {

  //Setting defaults (empty) for fields
  const aboutMeRef = useRef();
  const aboutHLRef = useRef();
  const birthDateRef = useRef();
  const genderRef1 = useRef();
  const genderRef2 = useRef();

  //State variables for profile settings
  const [userData, setUserData] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [country, setCountry] = useState(null);
  const [region, setRegion] = useState(null);
  const [UId, setUId] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadMsg, setUploadMsg] = useState("");
  const [oldPicURL, setOldPicURL] = useState(null);
  const [picURL, setPicURL] = useState(null);
  const [hideLocation, setHideLocation] = useState(null);
  const [hideAge, setHideAge] = useState(null);
  const [hidePronouns, setHidePronouns] = useState(null);
  const user = useContext(AuthContext).fbUser;


  useEffect(async () => {

    //Retrieve userData from db, and change state variables
    const getUserData = async function () {
      const myUId = doc(db, user);
      setUId(myUId);
      const result = await getDoc(myUId);
      setUserData(result.data());
      setHideLocation(result.data().privateLocation);
      setHideAge(result.data().privateAge);
      setHidePronouns(result.data().privatePronouns);
      setOldPicURL(result.data().profilePic);
      console.log(userData);
    };
    //Call declared method
    await getUserData();
  }, []);

  useEffect(async () => {
    //Updating profile picture
    const picDataForUpdate = {
      profilePic: picURL,
    };

    //If there is a picURL, update db, set pic, and send confirmation msg
    if (picURL != null) {
      await updateDoc(UId, picDataForUpdate);
      setUploadMsg("Image uploaded successfully!");
      setOldPicURL(picURL);
    }
  }, [picURL]);

  //Upload profile pic to db
  const handleUpload = () => {
    setUploadMsg("Initializing upload...");

    //Check if it's the default pfp
    if (
      userData.profilePic !==
      "https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/profilePictures%2Fdefault%2Fdefault.jpg?alt=media&token=276e66bb-1827-403b-bb6a-839d6cb9916b"
    ) {
      //Delete old msg
      console.log("deleting old photo");
      const oldImageReference = ref(storage, oldPicURL);
      deleteObject(oldImageReference);
    }

    //placing pfp in storage
    const storageRef = ref(
      storage,
      "/profilePictures/" + UId.id + "/" + file.name
    );

    //Upload to storageRef
    const uploadTask = uploadBytesResumable(storageRef, file);

    //Upload progression update
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadMsg("Uploading: " + percent + "%");
      },
      (err) => console.log(err), //log error if occurs
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setPicURL(url);
        });
      }
    );
  };

  //Update information
  const updateInfo = async () => {
    console.log(userData);
    //set new data
    const enteredAboutMe = aboutMeRef.current.value;
    const enteredAboutHL = aboutHLRef.current.value;
    const enteredBirthDate = birthDateRef.current.value;
    const enteredGender1 = genderRef1.current.value;
    const enteredGender2 = genderRef2.current.value;

    //updating user data
    const userDataForUpdate = {
      aboutMe: enteredAboutMe,
      aboutHearingLoss: enteredAboutHL,
      birthDate: enteredBirthDate,
      genderPronoun1: enteredGender1,
      genderPronoun2: enteredGender2,
      privateLocation: hideLocation,
      privateAge: hideAge,
      privatePronouns: hidePronouns,
    };

    //Checking for null values
    if (country != null) {
      userDataForUpdate.country = country;
    }

    if (region != null) {
      userDataForUpdate.region = region;
    }

    //Update db
    await updateDoc(UId, userDataForUpdate);

    window.location.reload(); //force reload
  };
// Function to toggle edit mode and expansion
const toggleEdit = () => {
  setEditProfile(!editProfile);
};
  //Display
  return (
    <>
      {/* Nav Bar */}
      <Nav />

      {/* Show user Data if it exists */}
      <div className={classes.main_container}>
        {userData && (
          <>
            {/* Profile picture */}
            <div className={classes.profile_container}>
              <img
                className={classes.img_container}
                src={userData.profilePic}
                alt = "Profile_Picture"
              />
              {/* Show user's full name and location if hidden flag not triggered */}
             <div
             className="user_name"
             > <h1>{userData.fName + " " + userData.lName}</h1> </div>
              {!hideLocation && (
                <p className={classes.user_subinfo}>
                  {userData.country}, {userData.region}
                </p>
              )}
              {/* Age if flag not triggered */}
              {!hideAge && (
                <p className={classes.user_subinfo}>
                  {Math.floor(
                    Math.abs(new Date() - Date.parse(userData.birthDate)) /
                      31536000000
                  )}{" "}
                  years old
                </p>
              )}
              {/* Pronouns if flag not triggered */}
              {!hidePronouns && (
                <p className={classes.user_subinfo}>
                  {userData.genderPronoun1} / {userData.genderPronoun2}
                </p>
              )}
            </div>
            {/* Check if edit profile is not triggered. Show Abouts */}
            <div className={classes.aboutMe_container}>
              <div className={`main_container ${editProfile ? 'expanded' : ''}`}>
                {!editProfile && (
                  <button onClick={toggleEdit} className={classes.profile_buttons}>
                  {editProfile ? 'Cancel' : 'Edit Profile'}
                </button>
                )}
                </div>
              {!editProfile && (
                <div>
                  <h5>About Me:</h5>
                  <p className={classes.user_subinfo}>{userData.aboutMe}</p>
                  <h5> </h5>
                  <h5>About My Hearing Loss:</h5>
                  <p className={classes.user_subinfo}>
                    {userData.aboutHearingLoss}
                  </p>
                </div>
              )}
              
              {/* Edit profile flag triggered */}
              {editProfile && (
                <div className={classes.editProfileContainer}>
                  {/* Profile picture upload */}
                  <h5>Upload Profile Picture:</h5>
                  <input
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    className={classes.choose_file}
                    onChange={(val) => setFile(val.target.files[0])}
                  ></input>
                  {file && (
                    <button
                      onClick={handleUpload}
                      className={classes.upload_button}
                    >
                      Upload Image
                    </button>
                  )}
                  {/* Edit Profile Information */}
                  <p className={classes.upload_msg}>{uploadMsg}</p>
                  <h5>About Me:</h5>
                  <textarea className={classes.text_box} ref={aboutMeRef}>
                    {userData.aboutMe}
                  </textarea>
                  <h5>About My Hearing Loss:</h5>
                  <textarea className={classes.text_box} ref={aboutHLRef}>
                    {userData.aboutHearingLoss}
                  </textarea>
                  <h5>Change Birth Date:</h5>
                  <input
                    className={classes.date_select}
                    ref={birthDateRef}
                    defaultValue={userData.birthDate}
                    type="date"
                  ></input>
                  <h5>Change Country and Region:</h5>
                  <CountryDropdown
                    className={classes.drop_down}
                    value={country}
                    onChange={(val) => {
                      setCountry(val);
                    }}
                  />
                  <RegionDropdown
                    className={classes.drop_down}
                    country={country}
                    value={region}
                    onChange={(val) => {
                      setRegion(val);
                    }}
                  />
                  <h5>Change Pronouns:</h5>
                  <select className={classes.drop_down} ref={genderRef1}>
                    <option
                      value={userData.genderPronoun1}
                      selected
                      disabled
                      hidden
                    >
                      {userData.genderPronoun1}
                    </option>
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
                  <select className={classes.drop_down} ref={genderRef2}>
                    <option
                      value={userData.genderPronoun2}
                      selected
                      disabled
                      hidden
                    >
                      {userData.genderPronoun2}
                    </option>
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
                  <br></br>

                  {/* Hide flags */}
                  <div className={classes.check_box_container}>
                    <input
                      type="checkbox"
                      id="hideLocation"
                      defaultChecked={userData.privateLocation}
                      onChange={(e) => setHideLocation(e.target.checked)}
                    />
                    <label for="hideLocation" className={classes.checkbox_label}>
                      {" "}
                      Hide Location
                    </label>
                    <input
                      type="checkbox"
                      id="hideAge"
                      defaultChecked={userData.privateAge}
                      onChange={(e) => setHideAge(e.target.checked)}
                    />
                    <label for="hideAge" className={classes.checkbox_label}>
                      {" "}
                      Hide Age
                    </label>
                    <input
                      type="checkbox"
                      id="hidePronouns"
                      defaultChecked={userData.privatePronouns}
                      onChange={(e) => setHidePronouns(e.target.checked)}
                    />
                    <label for="hidePronouns" className={classes.checkbox_label}>
                      {" "}
                      Hide Pronouns
                    </label>

                  </div>
                  
                </div>
              )}
            </div>
          </>
        )}

        {/* Buttons at the bottom of screen */}
        
        {/* Buttons if editProfile is active */}
        {editProfile && (
          <div>
            <button
              onClick={() => updateInfo()}
          
              className={classes.save_button}
            >
              Save
            </button>
            <button
              onClick={() => setEditProfile(false)}
              className={classes.cancel_button}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default MyProfilePage;
