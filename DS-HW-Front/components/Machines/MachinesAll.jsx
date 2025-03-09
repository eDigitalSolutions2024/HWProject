import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation'
import Loading from '../shared/Loading'
import MachineImage from '../shared/machines/MachineImages'
import { getMachineImage, getMachineListApi, deleteMachine } from '../../api/machine'
import MachineDetail from "../shared/machines/MachineDetail"
import NoDataFound from '../shared/NoDataFound';
import Modal from "@components/shared/Modal"
import { deleteMachineByidAction } from '@machineActions'


export default function AllMachinesList() {
    const dispatch = useDispatch();
    const router = useRouter();
    const machinesList = useSelector(state => state.machine.list)
    const isLoading = useSelector(state => state.machine.isLoadingList)

    const deleteLogicMachine = (id, e) => {
        dispatch(deleteMachineByidAction(id));
    }

    return (
        machinesList?.length > 0
            ? (
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='table-header'>Estatus</th>
                                <th className='table-header'>Id Maquina</th>
                                <th className='table-header'>Nombre Maquina</th>
                                <th className='table-header'>Serial</th>
                                <th className='table-header'>Proveedor</th>
                                <th className='table-header'>Fecha calibración</th>
                                <th className='table-header'>Expira</th>
                                <th className='table-header'>Foto equipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                machinesList?.map((data, index) => (
                                    
                                    <tr key={index} >
                                        {/* <td><input style={{ backgroundColor: data && data.status ? "Green" : "Red" }} type='text' disabled width={5}/></td> */}
                                        <td>{data.status ? <span className="badge bg-success"><h5 className='mt-2'>Activo</h5></span> : <span className="badge bg-danger"><h5 className='mt-2'>Inactivo</h5></span>}</td>
                                        <td onClick={() => { router.push(`/machine/${data._id}`)}} className='pointer'> <u>{data?.id_maquina}</u></td>
                                        <td>{data?.nomMaquina}</td>
                                        <td>{data?.serial}</td>
                                        <td>{data?.proveedor}</td>
                                        <td className='text-left'>{dayjs(data?.last_calibration_date).format("DD MMM YYYY")}</td>
                                        <td className='text-left'>{dayjs(data?.expira).format("DD MMM YYYY")}</td>
                                        <td> <MachineImage alt={data.nomMaquina} getImage={getMachineImage} param={data?._id} status={data?.foto_equipo ? true : false} width={'150px'} height={'100px'} /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )
            : <NoDataFound className="mt-5" />
    )
}