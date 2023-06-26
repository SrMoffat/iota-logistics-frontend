import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const CModal = (props) => {
    const { open, setOpen, confirmLoading, setConfirmLoading, modalText, setModalText } = props;

    

    return (
        <>
            <Modal
                title="Title"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </>
    );
};

export default CModal;