import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'
//Redux
import { useSelector, useDispatch } from 'react-redux';
import Paginator from '../shared/Paginator'
import { getUserListAction } from "@userActions"
import { useRouter } from 'next/navigation'
import Loading from '../shared/Loading'
import Avatar from '../shared/Avatar'
import { getUserImage } from '../../api/users';
import NoDataFound from '../shared/NoDataFound';

export default function CustomerList() {
    const dispatch = useDispatch();
    const router = useRouter();
    const usersList = useSelector(state => state.user.list)
    const isLoading = useSelector(state => state.user.isLoadingList)

    return (
        usersList?.length > 0
            ? (<table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th className='table-header'>Nombre</th>
                        <th className='table-header'>Correo</th>
                        <th className='table-header'>Puesto</th>
                        <th className='table-header'>Cumpleaños</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usersList?.map((data, index) => (
                            <tr key={index} onClick={() => { router.push(`/users/${data._id}`) }}>
                                <td> <Avatar alt={data._id} getImage={getUserImage} param={data?._id} status={data?.image ? true : false} width={'50px'} height={'50px'} /></td>
                                <td>{data?.firstName + ' ' + data?.lastName}</td>
                                <td>{data?.email}</td>
                                <td className='text-left'>{data?.role?.role}</td>
                                <td className='text-left'>{dayjs(data?.birthDate).format("DD MMM YYYY")}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>)
            : <NoDataFound className="mt-5" />
    )
}