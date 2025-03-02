import { Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function NotAuthorizedModal({ openModal, redirectToHomeOnCancel, callBack }) {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(openModal);
    return (
        <Modal
            title="권한이 없습니다"
            open={isModalOpen}
            footer={null}
            onCancel={() => {
                setIsModalOpen(false);
                redirectToHomeOnCancel ? navigate('/home') : null
                if(!!callBack) callBack();
            }}
        >
        <p>해당 기능에 대한 권한이 없습니다.</p>
        </Modal>
    );
}