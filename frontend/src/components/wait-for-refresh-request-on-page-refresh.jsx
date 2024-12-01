/* eslint-disable */
import { cloneElement, useEffect, useRef, useState } from "react";
import axiosPrivate from "../hooks/axiosPrivate";

/* 
  This component should be wrapped around routes that require the accessToken at the beginning of page load
  (ex: if the accesstoken is required on page refresh)
  Since protected-routes requires such, this element should be wrapped outside all protected routes
  
  ex)
  <WaitRefreshRequestOnPageRefresh>
    <ProtectedRoutes><Protected....>
      <RealRoute.... />
    </ProtectedRoutes></Protected....>
  </WaitRefreshRequestOnPageRefresh>
*/

export const WaitRefreshRequestOnPageRefresh = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const isRefreshRequestSent = useRef(false); // tracks wheter a refresh request was sent
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
                if(!isRefreshRequestSent.current) { // if no requests are in process
                    isRefreshRequestSent.current = true;
                    await axiosPrivate.refreshRequest();
                } else { // if there already is a request in process
                    console.log("Waiting for the previous request to complete...");
                    await waitForRefreshRequestCompletion();  // Wait until the request is resolved
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
        ?  <></>
        : cloneElement(children, { accessToken: axiosPrivate.accessToken, roles: axiosPrivate.roles })
    );
}