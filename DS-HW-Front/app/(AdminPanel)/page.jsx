/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserListAction } from '@userActions'
import {  getMachineListAction } from '@machineActions'
import { getRoleListAction } from '@store/actions/roleAction'
import MachinesList from '@components/Machines/MachinesList'
import UsersHeader from '@components/Users/UsersHeader'
import Loading from '@components/shared/Loading'

const page = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.machine.isLoadingList)

  useEffect(() => {
    dispatch(getRoleListAction())
  }, [dispatch])

  useEffect(() => {
    dispatch(getMachineListAction())
  }, [dispatch])


  return (
    <div className='mt-4 d-flex flex-column'>
      <div className='border-bottom'>
        {/* <UsersHeader /> */}
      </div>
      <div className='ms-1 mt-4'>
        {
          isLoading
            ? <Loading />
            : <MachinesList />
        }
      </div>
    </div>
  )
}

export default page