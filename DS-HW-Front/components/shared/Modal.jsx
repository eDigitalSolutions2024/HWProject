import React from 'react'
import { Modal } from 'react-bootstrap';

export default function ModalProp(props) {
    const { show = false, title, content, setShow, size = 'lg', children, fullscreen = false } = props;
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Modal className='' size={size} show={show} onHide={handleClose} fullscreen={fullscreen} >
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    )
}
