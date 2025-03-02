import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import LoginModal from "./login-modal/login-modal";
import { Modal } from "antd";

export const ProtectedRoute = ({ children }) => {
    const authValue = useAuth();
    return (
        !authValue.userLoggedIn
        ? <LoginModal openModal={true} />
        : children
    );
};

export const ProtectedUser  = ({ children }) => {
    const navigate = useNavigate();
    const authValue = useAuth();
    return (
        authValue.userType !== "User"
        ? <Modal
            title="권한이 없습니다"
            open={true}
            footer={null}
            onCancel={() => navigate('/home')}
        >
        <p>해당 기능에 대한 권한이 없습니다.</p>
        </Modal>
        : children
    );
}
export const ProtectedAdmin  = ({ children }) => {
    const navigate = useNavigate();
    const authValue = useAuth();
    return (
        authValue.userType !== "Admin"
        ? <Modal
            title="권한이 없습니다"
            open={true}
            footer={null}
            onCancel={() => navigate('/home')}
        >
        <p>해당 기능에 대한 권한이 없습니다.</p>
        </Modal>
        : children
    );
}