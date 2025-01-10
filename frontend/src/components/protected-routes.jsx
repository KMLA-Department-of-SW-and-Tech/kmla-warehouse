/* eslint-disable */
import { Navigate, useNavigate } from "react-router-dom";
//import axiosPrivate from "../hooks/axiosPrivate";
import { cloneElement, useEffect, useRef, useState } from "react";
import { Modal } from "antd";

export const ProtectedRoute = ({ children, accessToken, roles }) => {
    const navigate = useNavigate();
    // wait for refresh request on page refresh necessarily first
    const handleConfirm = () => {
        // "확인"을 클릭하면 로그인 화면으로 이동
        navigate('/login');
    };

    const handleCancel = () => {
        // "취소"를 클릭하면 equipment home으로 이동
        navigate('/home'); // assuming that the only un-logged in page is home redirecting to there
    };
    return (
        accessToken === ""
        ? <Modal
                title="로그인이 필요합니다"
                visible={true}
                onOk={handleConfirm}
                onCancel={handleCancel}
                okText="로그인"
                cancelText="취소"
            >
            <p>해당 기능은 로그인이 필요합니다. 로그인 화면으로 이동하시겠습니까?</p>
            </Modal>
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