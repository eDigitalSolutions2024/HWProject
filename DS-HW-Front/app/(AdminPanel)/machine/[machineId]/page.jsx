'use client'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setCurrentMachineAction} from '@machineActions'
import MachineDetail from '@components/shared/machines/MachineDetail'
import { getRoleListAction } from '@store/actions/roleAction'

const MachineId = ({params}) => {
  const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setCurrentMachineAction(params.machineId))
        // dispatch(getRoleListAction())
    }, [])
  return (
    <div className='h-100'>
        <MachineDetail />
    </div>
  )
}

export default MachineId