/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
// Aquí puedes importar acciones si luego necesitas algo del store

import CertificadosCriticos from '../../../components/agencyCerts/CertificadosCriticos' // 🔥 ruta relativa como en Machines
import Loading from '../../../components/shared/Loading' // opcional si usas loading
// import otros componentes como encabezado si necesitas

const Page = () => {
  const dispatch = useDispatch()

  // puedes usar useEffect si vas a hacer algún dispatch inicial
  useEffect(() => {
    // Por ejemplo, si luego deseas cargar roles, folders, etc
    // dispatch(getFolderListAction())
  }, [dispatch])

  return (
    <div className='mt-4 d-flex flex-column'>
      <div className='border-bottom'>
        <h3 className="ms-3">Certificados Críticos de Agencia</h3>
      </div>
      <div className='ms-1 mt-4'>
        <CertificadosCriticos />
      </div>
    </div>
  )
}

export default Page
