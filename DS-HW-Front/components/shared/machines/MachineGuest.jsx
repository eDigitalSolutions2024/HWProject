import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
// import { Check } from 'react-bootstrap/Form';
import dayjs from 'dayjs'
const utc = require('dayjs/plugin/utc')
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation'
import MachineImage from '../../shared/machines/MachineImages'
import MachineTagImage from '../../shared/machines/MachineTagImage'
import { getMachineImage, getMachineListApi, getCurrentMachine, getMachineTag, generateQR } from '../../../api/machine';
import { updateMachineByIdAction } from '@machineActions'
import Loading from '@components/shared/Loading'
import Modal from "@components/shared/Modal"
import UpdateMachineImageForm from "./UpdateMachineImage"
import UpdateMachineTagImageForm from "./UpdateMachineImageTag"
import FileDownload from 'js-file-download'

export default function MachineGuestDetail() {
  dayjs.extend(utc)
  const dispatch = useDispatch();
  const router = useRouter();
  const currentMachine = useSelector(state => state.machine.currentMachine)
  const [currentMachineState, setCurrentMachineState] = useState(currentMachine)
  const [currentField, setCurrentField] = useState('')
  const [isChangeActive, setIsChangeActive] = useState(false)
  const [showUpdateImageMachine, setShowUpdateImageMachine] = useState(false);
  const [showUpdateTagImageMachine, setShowUpdateTagImageMachine] = useState(false);
  const isLoading = useSelector(state => state.machine.isLoadingCurrentMachine)


  const updateCurrentMachine = () => {
    dispatch(updateMachineByIdAction(currentMachineState))
    setIsChangeActive(false)
  }

  const setData = (e) => {
    setCurrentMachineState({ ...currentMachineState, [e.target.name]: e.target.value })
  }

  const downloadImage = (e) => {
    generateQR(currentMachine?._id).then(response => {
      FileDownload(response, `${currentMachine?.nomMaquina}.png`);
    })
  }

  useEffect(() => {
    setCurrentMachineState(currentMachine)
  }, [currentMachine])


  return (
    <div className='mx-5 mt-3'>
      <h2 className=''><b>Detalles</b></h2>
      {isLoading ?
        <Loading /> :
        <Card className='card shadow'>
          <div className='d-flex flex-column flex-md-row justify-content-center'>
              <div className='pointer' onClick={() => setShowUpdateImageMachine(true)}>
                <MachineImage alt={currentMachine.nomMaquina} getImage={getMachineImage} param={currentMachine?._id} status={currentMachine?.foto_equipo ? true : false} width={'550px'} height={'350px'} />
              </div>
              <Modal title={'Actualizar Foto Equipo'} show={showUpdateImageMachine} setShow={setShowUpdateImageMachine} >
                <UpdateMachineImageForm setShow={setShowUpdateImageMachine} />
            </Modal>
            <div className='ms-5 pointer' onClick={() => setShowUpdateTagImageMachine(true)}>
              <MachineTagImage alt={currentMachine.nomMaquina} getImage={getMachineTag} param={currentMachine?._id} status={currentMachine?.foto_etiqueta_calibracion ? true : false} width={'550px'} height={'350px'} />
            </div>
            <Modal title={'Actualizar Foto Etiqueta'} show={showUpdateTagImageMachine} setShow={setShowUpdateTagImageMachine} >
                <UpdateMachineTagImageForm setShow={setShowUpdateTagImageMachine} />
            </Modal>
          </div>
          <Card.Body>
            <Card.Title onDoubleClick={() => { setCurrentField('Nombre'); setIsChangeActive(true) }}>Nombre Maquina: <strong>{currentField === 'Nombre' ? <input type='text' name='nomMaquina' onChange={(e) => setData(e)} defaultValue={currentMachineState.nomMaquina} /> : currentMachineState.nomMaquina}</strong></Card.Title>
            <Card.Text onDoubleClick={() => { setCurrentField('Comments'); setIsChangeActive(true) }}>{currentField === 'Comments' ? <input type='text' name='comments' onChange={(e) => setData(e)} defaultValue={currentMachineState.comments} /> : currentMachineState.comments}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item onDoubleClick={() => { setCurrentField('Id'); setIsChangeActive(true) }}>Id Maquina: {currentField === 'Id' ? <input type='text' name='id_maquina' onChange={(e) => setData(e)} defaultValue={currentMachineState.id_maquina} /> : currentMachineState.id_maquina}</ListGroup.Item>
            <ListGroup.Item onDoubleClick={() => { setCurrentField('Serial'); setIsChangeActive(true) }}>Serial: {currentField === 'Serial' ? <input type='text' name='serial' onChange={(e) => setData(e)} defaultValue={currentMachineState.serial} /> : currentMachineState.serial}</ListGroup.Item>
            <ListGroup.Item onDoubleClick={() => { setCurrentField('Manufacturador'); setIsChangeActive(true) }}>Manufacturador: {currentField === 'Manufacturador' ? <input type='text' name='manufacturador' onChange={(e) => setData(e)} defaultValue={currentMachineState.manufacturador} /> : currentMachineState.manufacturador}</ListGroup.Item>
            <ListGroup.Item onDoubleClick={() => { setCurrentField('Proveedor'); setIsChangeActive(true) }}>Proveedor: {currentField === 'Proveedor' ? <input type='text' name='proveedor' onChange={(e) => setData(e)} defaultValue={currentMachineState.proveedor} /> : currentMachineState.proveedor}</ListGroup.Item>
            <ListGroup.Item>Activo: <div className="form-check form-switch"><input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" name='activo' onChange={(e) => { setIsChangeActive(true); setCurrentMachineState({ ...currentMachineState, status: !currentMachineState?.status }) }} checked={Boolean(currentMachineState?.status)} /></div> </ListGroup.Item>
            <ListGroup.Item onDoubleClick={() => { setCurrentField('Type'); setIsChangeActive(true) }}>Type: {currentField === 'Type' ? <input type='text' name='type' onChange={(e) => setData(e)} defaultValue={currentMachineState.type} /> : currentMachineState.type}</ListGroup.Item>
            <ListGroup.Item onDoubleClick={() => { setCurrentField('Loc1'); setIsChangeActive(true) }}>Loc 1: {currentField === 'Loc1' ? <input type='text' name='loc1' onChange={(e) => setData(e)} defaultValue={currentMachineState.loc1} /> : currentMachineState.loc1}</ListGroup.Item>
            <ListGroup.Item onDoubleClick={() => { setCurrentField('Loc2'); setIsChangeActive(true) }}>Loc 2: {currentField === 'Loc2' ? <input type='text' name='loc2' onChange={(e) => setData(e)} defaultValue={currentMachineState.loc2} /> : currentMachineState.loc2}</ListGroup.Item>
            <ListGroup.Item onDoubleClick={() => { setCurrentField('Loc3'); setIsChangeActive(true) }}>Loc 3: {currentField === 'Loc3' ? <input type='text' name='loc3' onChange={(e) => setData(e)} defaultValue={currentMachineState.loc3} /> : currentMachineState.loc3}</ListGroup.Item>
            <ListGroup.Item onDoubleClick={() => { setCurrentField('Last_calib'); setIsChangeActive(true) }}>Última fecha calibración: <strong><u>{currentField === 'Last_calib' ? <input type='date' name='last_calibration_date' onChange={(e) => setData(e)} defaultValue={dayjs(currentMachineState?.last_calibration_date).utc().format('YYYY-MM-DD')} /> : dayjs(currentMachineState?.last_calibration_date).format("DD MMM YYYY")}</u></strong></ListGroup.Item>
            <ListGroup.Item onDoubleClick={() => { setCurrentField('Expira'); setIsChangeActive(true) }}>Expira: <strong><u>{currentField === 'Expira' ? <input type='date' name='expira' onChange={(e) => setData(e)} defaultValue={dayjs(currentMachineState?.expira).utc().format('YYYY-MM-DD')} /> : dayjs(currentMachineState?.expira).format("DD MMM YYYY")}</u></strong></ListGroup.Item>
            <ListGroup.Item onDoubleClick={() => { setCurrentField('Interval'); setIsChangeActive(true) }}>Intervalo tiempo calibración: {currentField === 'Interval' ? <input type='text' name='calibration_interval_define' onChange={(e) => setData(e)} defaultValue={currentMachineState.calibration_interval_define} /> : currentMachineState.calibration_interval_define}</ListGroup.Item>
            <ListGroup.Item onDoubleClick={() => { setCurrentField('Range'); setIsChangeActive(true) }}>Rango de Trabajo: {currentField === 'Range' ? <input type='text' name='rango_trabajo' onChange={(e) => setData(e)} defaultValue={currentMachineState.rango_trabajo} /> : currentMachineState.rango_trabajo}</ListGroup.Item>
          </ListGroup>
        </Card>

      }
    </div>
  )
}
