import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import UserInformation from './UserInformation'
import UserTables from './UserTables'
import Loading from '@components/shared/Loading'

const UserInformationContent = () => {
    const isLoading = useSelector(state => state.user.isLoadingCurrentUser)
    return (
        <div className='row mt-4'>
            <div className='col-12 col-md-8 col-xxl-9'>
                <div className='d-flex flex-column'>
                    <UserTables />
                </div>
            </div>
            <div className='col-12 col-md-4 col-xxl-3' >
                {isLoading ? <Loading /> : <UserInformation />}
            </div>
        </div>
    )
}

export default UserInformationContent
