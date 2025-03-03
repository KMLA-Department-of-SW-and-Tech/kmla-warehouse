import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../../js/firebase/firebase";
import userService from "../../../js/api/userService";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("Unauthorized");

  async function initializeUser(userCred) {
    if (userCred) {
      setAccessToken(userCred.accessToken); // accesstoken for jwt
      setCurrentUser({ ...userCred });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    try {
      const userInfo = await userService.getUserInfo(userCred.accessToken);
      setUserType(userInfo.userType);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);

    return unsubscribe;
  }, []);

  const authValue = {
    currentUser,
    userLoggedIn,
    accessToken,
    userType,
  };

  return (
    // can add some loading features in the future
    <AuthContext.Provider value={authValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
