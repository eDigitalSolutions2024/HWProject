/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserListAction } from '@userActions'
import {  getMachineListAction, getAllMachineListAction } from '@machineActions'
import { getRoleListAction } from '@store/actions/roleAction'
import AllMachinesList from '@components/Machines/MachinesAll'
import MachineHeader from '@components/shared/machines/MachineHeader'
import Loading from '@components/shared/Loading'

const page = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.machine.isLoadingList)

  useEffect(() => {
    dispatch(getRoleListAction())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllMachineListAction())
  }, [dispatch])


  return (
    <div className='mt-4 d-flex flex-column'>
      <div className='border-bottom'>
        <MachineHeader />
      </div>
      <div className='ms-1 mt-4'>
        {
          isLoading
            ? <Loading />
            : <AllMachinesList />
        }
      </div>
    </div>
  )
}

export default page