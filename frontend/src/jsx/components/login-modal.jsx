import { Modal } from "antd";
import { useState } from "react";
// import { GoogleLogin } from "@react-oauth/google";
import { signUserInWithGoogle } from "../../js/firebase/auth";
import { getAdditionalUserInfo } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

import "./login-modal.css"

export default function LoginModal({ openModal }) {
    const [isModalOpen, setIsModalOpen] = useState(openModal);

    const handleGoogleLogin = async () => {
        const res = await signUserInWithGoogle();
        const isNewUser = getAdditionalUserInfo(res).isNewUser;
        console.log(isNewUser);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal title="KMLA WAREHOUSE LOGIN" open={isModalOpen} footer={null} onCancel={handleCancel}>
            <div className="modal-container">
                <p>큼라창고에 존재하는 물품을 대여하거나 반납하기 위해서는 로그인이 되어 있어야 합니다. 아래 버튼을 통해 구글 계정으로 로그인을 진행한 후 사용해 주세요!</p>
                <div className="google-login-btn0-container">
                    <button className="google-login-btn">
                        <FcGoogle className="google-icon" />
                        <span>Log in with Google</span>
                    </button>
                </div>
            </div>
        </Modal>
    );
}