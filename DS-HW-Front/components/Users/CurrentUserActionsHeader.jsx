import React from 'react'
import Paginator from '@components/shared/Paginator'
import { useSelector } from 'react-redux';

const CurrentUserActionsHeader = ({ page, setPage, setDescription, setActionType, setTarget, setEndDate, setStartDate }) => {
    const totalItems = useSelector(state => state.user.totalCurrentUserTimeLineActions);

    return (
        <div className='d-flex flex-column'>
            <div className='d-flex flex-column flex-sm-row flex-between'>
                <div className="input-group mb-3 me-2">
                    <span className="input-group-text">Fecha de inicio</span>
                    <input type="date" className="form-control search-input" onChange={event => setStartDate(event.target.value)} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Fecha de Fin</span>
                    <input type="date" className="form-control search-input" onChange={event => setEndDate(event.target.value)} />
                </div>
            </div>
            <div className='d-flex flex-column flex-sm-row flex-between'>
                <div className="input-group mb-3 w-100 me-2">
                    <span className="input-group-text">{`Accion`}</span>
                    <select name='action' className='form-select search-input' onChange={e => setActionType(e.target.value)}>
                        <option value={''}>Tipo de Accion</option>
                        {
                            process.env.actionTypeOptions?.map((type, index) => (
                                <option key={index} value={type.value}> {type.display} </option>
                            ))
                        }
                    </select>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">{`Objetivo`}</span>
                    <select name='target' className='form-select search-input' onChange={e => setTarget(e.target.value)}>
                        <option value={''}>Objetivo de la Accion</option>
                        {
                            process.env.targetOptions?.map((type, index) => (
                                <option key={index} value={type.value}> {type.display} </option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className='d-flex align-items-center justify-content-center flex-column flex-sm-row flex-between'>
                <div className="input-group mb-3">
                    <span className="input-group-text">Descripcion</span>
                    <input type="text" className="form-control search-input" onChange={event => setDescription(event.target.value)} />
                </div>
            </div>
            <div className='d-flex flex-column flex-sm-row align-items-center'>
                <div className='d-flex align-items-center ms-2'>
                    <div className='d-flex align-items-center'>
                        <span>crear</span>
                        <span className='create-dot mx-3' />
                    </div>
                    <div className='d-flex align-items-center'>
                        <span>Actualizar</span>
                        <span className='update-dot mx-3' />
                    </div>
                    <div className='d-flex align-items-center'>
                        <span>Eliminar</span>
                        <span className='delete-dot mx-3' />
                    </div>
                </div>
                <div className='d-flex align-items-center mt-3 ms-sm-auto'>
                    <Paginator totalItems={totalItems} page={page} setPage={setPage} />
                </div>

            </div>

        </div>
    )
}

export default CurrentUserActionsHeader