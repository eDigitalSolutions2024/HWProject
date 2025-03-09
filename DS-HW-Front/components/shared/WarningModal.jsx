import React from 'react'
import { Modal } from 'react-bootstrap';

export default function WarningModal(props) {
    const { show = false, title, message, action, setShow, size = 'lg' } = props;
    const handleClose = () => setShow(false);
    return (
        <div>
            <Modal size={size} show={show} onHide={handleClose} className='mt-5'>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex flex-column align-items-center justify-content-center'>
                        <div>
                            <span className='bi bi-exclamation-triangle-fill warning-icon' />
                        </div>
                        <div>
                            <h4 className='text-center'>{message}</h4>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex flex-between w-100 mx-3'>
                        <button className='btn btn-action-primary' onClick={() => setShow(false)}>Cacelar</button>
                        <button className='btn btn-action-primary' onClick={() => { setShow(false); action() }}>Aceptar</button>

                    </div>
                </Modal.Footer>
            </Modal>
            <script>

            </script>
        </div>
    )
}