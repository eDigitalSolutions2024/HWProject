'use client'
import React, { useState } from 'react'
import dayjs from 'dayjs';
//Redux
import { useSelector } from 'react-redux';
//components
import UserForm from './UserForm';
import UpdateUserImageForm from './UpdateUserImageForm';
import Modal from "@components/shared/Modal"
import Avatar from '../shared/Avatar'
import { getUserImage } from '../../api/users';
import ChangeUserPassword from './ChangeUserPasswordModal';
const utc = require('dayjs/plugin/utc')
import { es } from "dayjs/locale/es";

const UserInformation = ({ id }) => {
    dayjs.locale("es");
    dayjs.extend(utc)
    const [showEditUser, setShowEditUser] = useState(false);
    const [showUpdateImageUser, setShowUpdateImageUser] = useState(false);
    const [showChangePass, setShowChangePass] = useState(false)
    const user = useSelector(state => state.user.currentUser)
    const authUser = useSelector(state => state?.user.authUser)

    return (
        <div className='card shadow'>
            <div className='d-flex flex-column'>
                <div className='d-flex flex-between mb-3 align-items-center'>
                    <div className=''>
                        <h5 className='me-3'><b>Fecha de entrada: </b></h5>
                        <h5> {` ${dayjs(user.entryDate).utc().format('DD-MMMM-YYYY')}`}</h5>
                    </div>
                    {((authUser._id == user._id) || (authUser.role.updatePermissions.includes('users') || authUser.role.role === 'ADMIN_ROLE')) && (
                        <div>
                            <i className="bi bi-pencil-square font-size-32 pointer" onClick={() => setShowEditUser(true)} />
                        </div>
                    )
                    }
                </div>
                <div className='d-flex align-items-center justify-content-center mb-4' >
                    <div style={{ width: '200px', height: '200px' }} className='pointer' onClick={() => setShowUpdateImageUser(true)}>
                        <Avatar className='pointer mx-auto' alt={user._id} getImage={getUserImage} param={user._id} status={user.image ? true : false} width={'200px'} height={'200px'} />
                    </div>
                </div>
                <h5 className='text-center'>Informacion de Usuario</h5>
                <h5 className='text-center'>{`${user.firstName} ${user.lastName}`}</h5>
                <h5 className='text-center'>{user?.role?.role}</h5>
                <ChangePasswordButton setShowChangePass={setShowChangePass} />
                <UserData user={user} />
            </div>
            <Modal title={'Actualizar Imagen'} show={showUpdateImageUser} setShow={setShowUpdateImageUser}>
                <UpdateUserImageForm setShow={setShowUpdateImageUser} />
            </Modal>
            <Modal title={'Editar Informacion de Usuario'} show={showEditUser} setShow={setShowEditUser}>
                <UserForm user={user} setShow={setShowEditUser} />
            </Modal>
            <Modal title={'Cambiar Contraseña'} show={showChangePass} setShow={setShowChangePass} size='sm'>
                <ChangeUserPassword setShow={setShowChangePass} />
            </Modal>
        </div>
    )
}

export default UserInformation

export const ChangePasswordButton = ({ setShowChangePass }) => {
    return (
        <div className='flex-center mt-2'>
            <button className='btn btn-action-primary' onClick={() => setShowChangePass(true)}>Cambiar Contraseña</button>
        </div>
    )
}

export const UserData = ({ user }) => {
    return (
        <div className='mt-4'>
            <div className='d-flex flex-between flex-column flex-lg-row mb-3 border-top pt-3'>
                <p><b>Cumpleanos:</b></p>
                <p>{dayjs(user.birthDate).utc().format('YYYY-MM-DD')}</p>
            </div>
            <div className='d-flex flex-between flex-column flex-xxl-row '>
                <p><b>Correo Electronico:</b></p>
                <p>{user.email}</p>
            </div>
        </div>
    )
}
