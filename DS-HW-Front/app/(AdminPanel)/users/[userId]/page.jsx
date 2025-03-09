'use client'
import React, { useEffect } from 'react'
import UserInformationContent from '@components/Users/UserInformationContent';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '@components/shared/Loading';
import { setCurrentUserAction } from '@userActions';
import { getRoleListAction } from '@store/actions/roleAction';
const UserId = ({ params }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setCurrentUserAction(params.userId))
        dispatch(getRoleListAction())
    }, [dispatch, params.userId])

    return (
        <div className='h-100'>
            <UserInformationContent />
        </div>
    )
}

export default UserId