import React, { useState, useEffect } from 'react'
// import UserForm from './UserForm'
import MachineForm from './MachineForm'
import Paginator from '@components/shared/Paginator'
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { getUserListAction } from "@userActions"

import Modal from '../../shared/Modal'

const MachineHeader = () => {

    const dispatch = useDispatch();

    const [show, setShow] = useState(false)

    const handleChange = (e) => {
        setUrl(e.target.value);
    }

    return (
        <>
           <div className='mb-0'>
                <div className='d-flex flex-column'>
                    <div className='d-flex flex-between'>
                        <h2><b></b>Maquinas</h2>
                    </div>
                </div>

                {/* Floating Action Button */}
                <button 
                    className="fab-button"
                    onClick={() => setShow(!show)}
                    title="Agregar nueva máquina"
                >
                    +
                </button>

                {/* Modal stays the same */}
                <Modal title="Nueva Maquina" show={show} setShow={setShow}>
                    <MachineForm setShow={setShow} />
                </Modal>
            </div>

        </>
    )
}

export default MachineHeader;
