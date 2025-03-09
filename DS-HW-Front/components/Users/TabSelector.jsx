'use client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUserTabAction } from '@userActions';

const TabSelector = () => {
  const dispatch = useDispatch();
  const { currentUserTab } = useSelector(state => state.user)

  return (
    <div className='w-100 mt-4'>
      <button type='button' onClick={() => dispatch(setCurrentUserTabAction('actions'))} className={currentUserTab == 'actions' ? 'btn btn-primary btn-active btn-tab-hover text-black' : 'btn btn-primary rounded-0-right'}>Acciones</button>
      {/* <button type='button' onClick={() => dispatch(setCurrentUserTabAction('files'))} className={currentUserTab == 'files' ? 'btn btn-primary btn-active btn-tab-hover text-black' : 'btn btn-primary rounded-0'}>Archivos</button> */}
      <button type='button' onClick={() => dispatch(setCurrentUserTabAction('files'))} className={currentUserTab == 'files' ? 'btn btn-primary btn-active btn-tab-hover text-black' : 'btn btn-primary rounded-0-left'}>Archivos</button>
    </div>
  )
}

export default TabSelector