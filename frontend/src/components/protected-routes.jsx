/* eslint-disable */
import { Navigate } from "react-router-dom";
import axiosPrivate from "../hooks/axiosPrivate";
import { cloneElement, useEffect, useRef, useState } from "react";

export const ProtectedRoute = ({ children, accessToken, roles }) => {
    // wait for refresh request on page refresh necessarily first
    return (
        accessToken === ""
        ? <Navigate to="/login" />
        : cloneElement(children, { roles: roles })
    );
};

export const ProtectedUser  = ({ roles, children }) => {
    return (
        !roles.includes("User")
        ? <Navigate to="/login" />
        : children
    );
}
export const ProtectedAdmin  = ({ roles, children }) => {
    return (
        !roles.includes("Admin")
        ? <Navigate to="/login" />
        : children
    );
}