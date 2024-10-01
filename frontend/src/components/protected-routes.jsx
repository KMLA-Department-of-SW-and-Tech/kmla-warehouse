/* eslint-disable */
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axiosPrivate from "../hooks/axiosPrivate";
import { useEffect, useState } from "react";


/* export async function protectedRouteLoader() {
    try {
        await axiosPrivate.refreshRequest();
    } catch (err) {
        console.log("Protected Routes refresh error", err);
    } finally {
        return { isLoggedIn: axiosPrivate.accessToken !== "" };
    }
} */
  
export const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const init = async () => {
            try {
                await axiosPrivate.refreshRequest();
            } catch (err) {
                console.log("Protected Routes refresh error", err);
            } finally {
                setLoading(false);
            }
        }
        init();
    }, []);
    return (
        loading
        ? <>loading</>
        : (
            axiosPrivate.accessToken === ""
            ? <Navigate to="/kmla-warehouse/login" />
            : <>Sh*t</>
        )
    );
};