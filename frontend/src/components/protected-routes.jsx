/* eslint-disable */
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

export function ProtectedRoute({ children }) {
    return (
        !Cookies.get("logged_in") ? <Navigate to="/kmla-warehouse/login" /> : children
    );
    
}