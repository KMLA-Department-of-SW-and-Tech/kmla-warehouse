import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import axiosPrivate from "../hooks/axiosPrivate";

// export const createUserAccount = async (email, pwd) => {
//     return createUserWithEmailAndPassword(auth, email, pwd);
// }

// export const signUserIn = async (email, pwd) => {
//     return signInWithEmailAndPassword(auth, email, pwd);
// }

const syncFirebaseWithMongoose = async (credential) => {
    const result = await axiosPrivate.post("/api/user/sync", {}, credential.user.accessToken);
    console.log(result);
    return result;
}


export const signUserInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account', // This forces the account selection account every time
        });
        const result = await signInWithPopup(auth, provider);
        console.log(result.user);
        // check whether user exists and create account if ...
        if(result) await syncFirebaseWithMongoose(result);
        // check admin
        
        return result;
    } catch(err) {
        console.log(err);
        throw err;
    }
}

export const signUserOut = async () => {
    return auth.signOut();
}

// export const changeUserPwd = async (pwd) => {
//     return updatePassword(auth.currentUser, pwd);
// }

// export const resetUserPwd = async (email) => {
//     return sendPasswordResetEmail(auth, email);
// }