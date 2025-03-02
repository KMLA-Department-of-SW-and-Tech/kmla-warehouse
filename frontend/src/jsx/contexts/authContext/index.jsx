import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../../js/firebase/firebase";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [loading, setLoading] = useState(true);

    async function initializeUser(userCred) {
        if(userCred) {
            setAccessToken(userCred.accessToken); // accesstoken for jwt
            setCurrentUser({ ...userCred });
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);

        return unsubscribe;
    }, []);

    const authValue =  {
        currentUser,
        userLoggedIn,
        accessToken,
    };

    return (
        <AuthContext.Provider value={authValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
}