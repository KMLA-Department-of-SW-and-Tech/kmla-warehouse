/* eslint-disable */
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

export function ProtectedRoute({ children }) {
    return (
        !Cookies.get("Logged_In") ? <Navigate to="/kmla-warehouse/login" /> : children
    );
    
}