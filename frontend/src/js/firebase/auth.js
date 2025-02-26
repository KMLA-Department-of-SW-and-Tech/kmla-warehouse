import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword } from "firebase/auth"
import { auth } from "./firebase"


// export const createUserAccount = async (email, pwd) => {
//     return createUserWithEmailAndPassword(auth, email, pwd);
// }

// export const signUserIn = async (email, pwd) => {
//     return signInWithEmailAndPassword(auth, email, pwd);
// }

export const signUserInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account', // This forces the account selection account every time
    });
    const result = await signInWithPopup(auth, provider);
    //result.user
    return result;
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