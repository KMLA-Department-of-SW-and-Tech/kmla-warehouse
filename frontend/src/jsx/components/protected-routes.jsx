import { useNavigate } from "react-router-dom";
import { cloneElement } from "react";
import { useAuth } from "../contexts/authContext";
import LoginModal from "../components/login-modal";

export const ProtectedRoute = ({ children }) => {
    const authValue = useAuth();
    return (
        !authValue.userLoggedIn
        ? <LoginModal openModal={true} />
        : children
    );
};

// export const ProtectedUser  = ({ children }) => {
//     const navigate = useNavigate();
//     return (
        
//         ? <LoginModal
//             title="권한이 없습니다"
//             visible={true}
//             onOk={() => navigate('/login')}
//             onCancel={() => navigate('/home')}
//             okText="로그인"
//             cancelText="취소"
//         >
//         <p>해당 기능에 대한 권한이 없습니다. 로그인 화면으로 이동하시겠습니까?</p>
//         </LoginModal>
//         : children
//     );
// }
export const ProtectedAdmin  = ({ roles, children }) => {
    const navigate = useNavigate();
    return (
        !roles.includes("Admin")
        ? <LoginModal
            title="권한이 없습니다"
            visible={true}
            onOk={() => navigate('/login')}
            onCancel={() => navigate('/home')}
            okText="로그인"
            cancelText="취소"
        >
        <p>해당 기능에 대한 권한이 없습니다. 로그인 화면으로 이동하시겠습니까?</p>
        </LoginModal>
        : children
    );
}