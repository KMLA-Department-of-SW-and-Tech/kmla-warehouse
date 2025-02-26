import { Modal } from "antd";
import { useState } from "react";
// import { GoogleLogin } from "@react-oauth/google";
import { signUserInWithGoogle } from "../../js/firebase/auth";
import { getAdditionalUserInfo } from "firebase/auth";


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
                <button className="flex items-center justify-center w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition font-medium text-gray-700">
                    <FcGoogle className="w-6 h-6 mr-2" />
                    Log in with Google
                </button>

            </div>
        </Modal>
    );
}