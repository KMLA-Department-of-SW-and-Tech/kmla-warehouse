import LoginModal from "./login-modal/login-modal";
import NotAuthorizedModal from "./not-authorized-modal/not-authorized-modal";

import { useAuth } from "../contexts/authContext";

export const ProtectedRoute = ({ children }) => {
    const authValue = useAuth();
    return (
        !authValue.userLoggedIn
        ? <LoginModal openModal={true} redirectToHomeOnCancel={true} />
        : children
    );
};

export const ProtectedUser  = ({ children }) => {
    const authValue = useAuth();
    return (
        authValue.userType !== "User"
        ? <NotAuthorizedModal openModal={true} redirectToHomeOnCancel={true} />
        : children
    );
}
export const ProtectedAdmin  = ({ children }) => {
    const authValue = useAuth();
    return (
        authValue.userType !== "Admin"
        ? <NotAuthorizedModal openModal={true} redirectToHomeOnCancel={true} />
        : children
    );
}