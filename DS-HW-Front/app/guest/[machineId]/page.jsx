'use client'
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
// import { Check } from 'react-bootstrap/Form';
import dayjs from 'dayjs'
const utc = require('dayjs/plugin/utc')
//Redux
import { useSelector } from 'react-redux';
import MachineGuestImages from '../../../components/shared/machines/MachineImagesGuest'
import MachineGuestTagImage from '../../../components/shared/machines/MachineTagImageGuest'
import { getMachineByIdNoAuth, getMachineImageNoAuth, getMachineTagNoAuth } from '../../../api/machine';

import Loading from '@components/shared/Loading'

const MachineId = ({params}) => {
  dayjs.extend(utc)
  const [currentMachine, setCurrentMachine] = useState({})
  const isLoading = useSelector(state => state.machine.isLoadingCurrentMachine)

  useEffect(() => {
    
        const fetchData = async () => {
          const response = await getMachineByIdNoAuth(params.machineId);
          setCurrentMachine(response);
        }
        fetchData();
}, [])
  
  return (
    <div className='container mt-3'>
      <div className='row'>
        <div className='col-md-12'>
          <h2 className='mb-4'><b>Detalles</b></h2>
          {isLoading ?
            <Loading /> :
            <Card className='shadow'>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='align-items-center justify-content-center'>
                    <div className='img-fluid mb-4'>
                      <MachineGuestImages alt={currentMachine?.nomMaquina} getImage={getMachineImageNoAuth} param={currentMachine?._id} status={currentMachine?.foto_equipo ? true : false} width={'550px'} height={'350px'} />
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='align-items-center justify-content-center'>
                    <div className='img-fluid mb-4'>
                      <MachineGuestTagImage alt={currentMachine?.nomMaquina} getImage={getMachineTagNoAuth} param={currentMachine?._id} status={currentMachine?.foto_etiqueta_calibracion ? true : false} width={'550px'} height={'350px'} />
                    </div>
                  </div>
                </div>
              </div>
              <Card.Body>
                <Card.Title>Nombre Maquina: <strong>{currentMachine?.nomMaquina}</strong></Card.Title>
                <Card.Text>{currentMachine?.comments}</Card.Text>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item >Id Maquina: {currentMachine?.id_maquina}</ListGroup.Item>
                  <ListGroup.Item >Serial: {currentMachine?.serial}</ListGroup.Item>
                  <ListGroup.Item >Manufacturador: {currentMachine?.manufacturador}</ListGroup.Item>
                  <ListGroup.Item >Proveedor: {currentMachine?.proveedor}</ListGroup.Item>
                  <ListGroup.Item>Activo: {currentMachine?.state ? 'Activo' : 'Inactivo'} </ListGroup.Item>
                  <ListGroup.Item >Type: {currentMachine?.type}</ListGroup.Item>
                  <ListGroup.Item >Loc 1: {currentMachine?.loc1}</ListGroup.Item>
                  <ListGroup.Item >Loc 2: {currentMachine?.loc2}</ListGroup.Item>
                  <ListGroup.Item >Loc 3: {currentMachine?.loc3}</ListGroup.Item>
                  <ListGroup.Item >Última fecha calibración: <strong><u>{dayjs(currentMachine?.last_calibration_date).format("DD MMM YYYY")}</u></strong></ListGroup.Item>
                  <ListGroup.Item >Expira: <strong><u>{dayjs(currentMachine?.expira).format("DD MMM YYYY")}</u></strong></ListGroup.Item>
                  <ListGroup.Item >Intervalo tiempo calibración: {currentMachine?.calibration_interval_define}</ListGroup.Item>
                  <ListGroup.Item >Rango de Trabajo : {currentMachine?.rango_trabajo}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          }
        </div>
      </div>
    </div>
  )
}

export default MachineId