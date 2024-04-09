import React from "react";
import { useLocation } from "react-router-dom";
import backgroundImage from "../../assets/images/test-auth.png"; // Ensure this path is correct
import AuthForm from "../../components/auth/AuthForm";

/**Page to log in/sign up. */
function AuthPage() {
  //Check where the user accessed authpage from.
  const location = useLocation();

  return (
    <div
    style={{
      backgroundImage: `url(${backgroundImage})`,
      height: "100vh",
      width: "100vw",
      backgroundSize: "cover", // Make sure the image covers the full area
      backgroundPosition: "center", // Center the background image
      backgroundRepeat: "no-repeat", // Prevent the image from repeating
    }}
    >
      <AuthForm signIn={location?.state?.signIn ?? true} />
    </div>
  );
}

export default AuthPage;
