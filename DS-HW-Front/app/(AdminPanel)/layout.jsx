'use client'
import React, { useEffect, useState } from 'react';;
import NavBar from '@components/NavBar/'
import Header from '@components/Header'
import { getUserData } from '@Api/users';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAuthData } from '@store/slices/userSlices'
import LoadingLayout from "@components/shared/LoadingLayout"
import { setMachineData, setMachineList, setMachineListSuccess,  } from '@store/slices/machineSlice';
import { getMachineListApi } from '@Api/machine'

export default function AdminLayout({ children }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true)
  const auth = useSelector(state => state.user.authUser)
  const machine = useSelector(state => state.machine)
  useEffect(() => {
    if (document.body.clientWidth < 1500) {
      document.querySelector('.admin-layout')?.classList.add('active')
      document.querySelector('.NavbarComponent')?.classList.add('active')
      document.querySelector('.nav-items')?.classList.add('active')
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)
    getUserData()
      .then(response => {
        dispatch(setUserAuthData(response.user))
        setIsLoading(false)
      })
    getMachineListApi()
      .then(response => {
        dispatch(setMachineData(response.machine))
        setIsLoading(false)
      })
  }, [dispatch])


  return (
    <>{
      isLoading && auth && machine
        ? (
          <div className='layout-loading d-flex justify-content-center align-items-center'>
            <LoadingLayout />
          </div>
        )
        : (
          <div className='admin-layout'>
            <Header />
            <NavBar />
            <div className='admin-content px-3'>
              {children}
            </div>
          </div>
        )
    }
    </>
  );
}


