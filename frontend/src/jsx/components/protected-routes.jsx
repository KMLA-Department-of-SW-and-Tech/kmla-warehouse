import { useNavigate } from "react-router-dom";
import { cloneElement, useEffect, useRef, useState } from "react";

export const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const authValue = useAuth();
    return (
        accessToken === ""
        ? <Modal
                title="로그인이 필요합니다"
                visible={true}
                onOk={() => navigate('/login')}
                onCancel={() => navigate('/home')}
                okText="로그인"
                cancelText="취소"
            >
            <p>해당 기능은 로그인이 필요합니다. 로그인 화면으로 이동하시겠습니까?</p>
            </Modal>
        : cloneElement(children, { roles: roles })
    );
};

export const ProtectedUser  = ({ roles, children }) => {
    const navigate = useNavigate();
    return (
        !roles.includes("User")
        ? <Modal
            title="권한이 없습니다"
            visible={true}
            onOk={() => navigate('/login')}
            onCancel={() => navigate('/home')}
            okText="로그인"
            cancelText="취소"
        >
        <p>해당 기능에 대한 권한이 없습니다. 로그인 화면으로 이동하시겠습니까?</p>
        </Modal>
        : children
    );
}
export const ProtectedAdmin  = ({ roles, children }) => {
    const navigate = useNavigate();
    return (
        !roles.includes("Admin")
        ? <Modal
            title="권한이 없습니다"
            visible={true}
            onOk={() => navigate('/login')}
            onCancel={() => navigate('/home')}
            okText="로그인"
            cancelText="취소"
        >
        <p>해당 기능에 대한 권한이 없습니다. 로그인 화면으로 이동하시겠습니까?</p>
        </Modal>
        : children
    );
}