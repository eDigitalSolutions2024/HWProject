import React, { useState, useEffect } from 'react'
import UserForm from './UserForm'
import Paginator from '@components/shared/Paginator'
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { getUserListAction } from "@userActions"

import Modal from '../shared/Modal'
const UsersHeader = () => {

    const dispatch = useDispatch();

    const [show, setShow] = useState(false)
    const totalItems = useSelector(state => state.user.total)
    //const rolesList = useSelector(state => state.roles.roles)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [role, setRole] = useState("")

    const rolesList = useSelector(state => state.role.list)

    useEffect(() => {
        dispatch(getUserListAction(page, search, role));
        // eslint-disable-next-line 
    }, [page, search, role])

    return (
        <div className='mb-4'>
            <div className='d-flex flex-column'>
                <div className='d-flex flex-between'>
                    <h2><b></b>Usuarios</h2>
                    <button className='btn btn-action-primary' onClick={() => setShow(!show)}>Nuevo Usuario</button>
                </div>
                <div className='mt-5 flex-between overflow-hidden flex-column flex-md-row w-100'>
                    <div className='d-flex flex-column overflow-hidden flex-md-row w-75'>
                        <div className="input-group mb-3 me-5">
                            <span className="input-group-text">Busqueda</span>
                            <input type="text" className="form-control search-input" onChange={event => setSearch(event.target.value)} />
                        </div>
                        <div className="input-group mb-3 me-5">
                            <span className="input-group-text">{`Puesto`}</span>
                            <select name='role' className='form-select search-input' onChange={e => setRole(e.target.value)}>
                                <option value={''}>Puesto de empleado</option>
                                {
                                    rolesList?.map((data, index) => (
                                        <option key={index} value={data._id}> {data.role} </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end me-5'>
                        <Paginator totalItems={totalItems} page={page} setPage={setPage} />
                    </div>
                </div>
            </div>
            <Modal title="Nuevo Empleado" show={show} setShow={setShow}>
                <UserForm setShow={setShow} />
            </Modal>
        </div>
    )
}

export default UsersHeader;
