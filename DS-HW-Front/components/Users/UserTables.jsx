import React, { useState } from 'react'
import TabSelector from './TabSelector'
import CurrentUserAttachments from './CurrentUserAttachments'
// import CurrentUserMovements from './CurrentUserMovements'
import CurrentUserActions from './CurrentUserActions';
import { useSelector } from 'react-redux';


const UserTables = () => {

  const currentUserTab = useSelector(state => state.user.currentUserTab)
  return (
    <div>
      <div className='text-center'>
        <TabSelector />
      </div>

      <div className='mt-5'>
        {currentUserTab == 'actions' && <CurrentUserActions />}
        {currentUserTab == 'files' && <CurrentUserAttachments />}
        {/*
        {currentUserTab == 'movements' && <CurrentUserMovements />} */}
      </div>
    </div>

  )
}

export default UserTables