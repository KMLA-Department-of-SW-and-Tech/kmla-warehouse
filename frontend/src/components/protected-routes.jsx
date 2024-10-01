/* eslint-disable */
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axiosPrivate from "../hooks/axiosPrivate";
import { useEffect, useRef, useState } from "react";


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
    const isRefreshRequestSent = useRef(false);
  
    // code for react frontend double rendering --> cookie reading issue
    useEffect(() => {
        const waitForRefreshRequestCompletion = () => {
            return new Promise((resolve) => {
              const checkRequest = () => {
                if (!isRefreshRequestSent.current) {
                  resolve();  // Resolve when request is not pending
                } else {
                  setTimeout(checkRequest, 100);  // Check again after 100ms
                }
              };
              checkRequest();
            });
          };
        const init = async () => {
            try {
                if(!isRefreshRequestSent.current) {
                    isRefreshRequestSent.current = true;
                    await axiosPrivate.refreshRequest();
                } else {
                    console.log("Waiting for the previous request to complete...");
                    await waitForRefreshRequestCompletion();  // Wait for the flag to be reset
                    console.log("Previos request completed");
                    isRefreshRequestSent.current = true;
                    await axiosPrivate.refreshRequest();
                }
            } catch (err) {
                console.log("Protected Routes refresh error", err);
            } finally {
                isRefreshRequestSent.current = false;
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
            : children
        )
    );
};