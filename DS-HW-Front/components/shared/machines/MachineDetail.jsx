import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import MachineImage from '../../shared/machines/MachineImages';
import MachineTagImage from '../../shared/machines/MachineTagImage';
import { getMachineImage, getMachineTag, generateQR } from '../../../api/machine';
import { updateMachineByIdAction } from '@machineActions';
import Loading from '@components/shared/Loading';
import Modal from '@components/shared/Modal';
import UpdateMachineImageForm from './UpdateMachineImage';
import UpdateMachineTagImageForm from './UpdateMachineImageTag';
import UpdateMachineCertificado from './UpdateMachineCertificado.jsx';

import { saveAs } from 'file-saver';
import FileDownload from 'js-file-download';
import getApiBaseUrl from '@Utilities/apiBase';

export default function MachineDetail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentMachine = useSelector(state => state.machine.currentMachine);
  const [currentMachineState, setCurrentMachineState] = useState(currentMachine);
  const [currentField, setCurrentField] = useState('');
  const [isChangeActive, setIsChangeActive] = useState(false);
  const [showUpdateImageMachine, setShowUpdateImageMachine] = useState(false);
  const [showUpdateTagImageMachine, setShowUpdateTagImageMachine] = useState(false);
  const [showUpdateCertificado, setShowUpdateCertificado] = useState(false);

  const isLoading = useSelector(state => state.machine.isLoadingCurrentMachine);

  const updateCurrentMachine = () => {
    setIsChangeActive(false);
    dispatch(updateMachineByIdAction(currentMachineState));
  };

  const setData = (e) => {
    setCurrentMachineState({ ...currentMachineState, [e.target.name]: e.target.value });
  };

  const handleKeyPress = (e) => {
    setIsChangeActive(false);
    if (e.key === 'Enter') updateCurrentMachine();
  };

  const downloadCertificado = () => {
    if (!currentMachine?.cargar_certificado) {
      console.warn('No hay certificado para descargar.');
      return;
    }

    const API_BASE = getApiBaseUrl();
    fetch(`${API_BASE}/api/attachments/${currentMachine.cargar_certificado}/download`)
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo descargar el certificado');
        return res.blob();
      })
      .then((blob) => {
        saveAs(blob, `certificado-${currentMachine.nomMaquina}.pdf`);
      })
      .catch((err) => {
        console.error('Error al descargar el certificado:', err);
      });
  };

  const downloadImage = () => {
    generateQR(currentMachine?._id).then(response => {
      FileDownload(response, `${currentMachine?.nomMaquina}.png`);
    });
  };

  useEffect(() => {
    setCurrentMachineState(currentMachine);
    setIsChangeActive(false);
  }, [currentMachine]);

  return (
    <div className='mx-5 mt-3'>
      <h2><b>Detalles del Equipo</b></h2>
      {isLoading ? <Loading /> : (
        <Card className='card shadow'>
          <div className='d-flex flex-column flex-md-row justify-content-center'>
            <div className='pointer' onClick={() => setShowUpdateImageMachine(true)}>
              <MachineImage alt={currentMachine.nomMaquina} getImage={getMachineImage} param={currentMachine?._id} status={!!currentMachine?.foto_equipo} width='550px' height='350px' />
            </div>
            <Modal title='Actualizar Foto Equipo' show={showUpdateImageMachine} setShow={setShowUpdateImageMachine}>
              <UpdateMachineImageForm setShow={setShowUpdateImageMachine} />
            </Modal>

            <div className='ms-5 pointer' onClick={() => setShowUpdateTagImageMachine(true)}>
              <MachineTagImage alt={currentMachine.nomMaquina} getImage={getMachineTag} param={currentMachine?._id} status={!!currentMachine?.foto_etiqueta_calibracion} width='550px' height='350px' />
            </div>
            <Modal title='Actualizar Foto Etiqueta' onKeyPress={handleKeyPress} show={showUpdateTagImageMachine} setShow={setShowUpdateTagImageMachine}>
              <UpdateMachineTagImageForm setShow={setShowUpdateTagImageMachine} />
            </Modal>

            <Modal title='Actualizar Certificado' show={showUpdateCertificado} setShow={setShowUpdateCertificado}>
              <UpdateMachineCertificado setShow={setShowUpdateCertificado} />
            </Modal>
          </div>

          <Card.Body>
            <Card.Title onKeyPress={handleKeyPress} onClick={() => setCurrentField('Nombre')}>
              Nombre Maquina: <strong>{currentField === 'Nombre' ? <input type='text' name='nomMaquina' onChange={setData} defaultValue={currentMachineState.nomMaquina} /> : currentMachineState.nomMaquina}</strong>
            </Card.Title>
            <Card.Text onKeyPress={handleKeyPress} onClick={() => setCurrentField('Comments')}>
              {currentField === 'Comments' ? <input type='text' name='comments' onChange={setData} defaultValue={currentMachineState.comments} /> : currentMachineState.comments}
            </Card.Text>
          </Card.Body>

          <ListGroup onKeyPress={handleKeyPress} className='list-group-flush'>
            <ListGroup.Item onClick={() => setCurrentField('Id')}>Id Maquina: {currentField === 'Id' ? <input type='text' name='id_maquina' onChange={setData} defaultValue={currentMachineState.id_maquina} /> : currentMachineState.id_maquina}</ListGroup.Item>
            <ListGroup.Item onClick={() => setCurrentField('seccion')}>Sección: {currentField === 'seccion' ? <input type='text' name='seccion' onChange={setData} defaultValue={currentMachineState.seccion} /> : currentMachineState.seccion}</ListGroup.Item>
            <ListGroup.Item onClick={() => setCurrentField('Serial')}>Serial: {currentField === 'Serial' ? <input type='text' name='serial' onChange={setData} defaultValue={currentMachineState.serial} /> : currentMachineState.serial}</ListGroup.Item>
            <ListGroup.Item onClick={() => setCurrentField('liga_certificado')}>Liga Certificado: {currentField === 'liga_certificado' ? <input type='text' name='liga_certificado' onChange={setData} defaultValue={currentMachineState.liga_certificado} /> : currentMachineState.liga_certificado}</ListGroup.Item>
            <ListGroup.Item onClick={() => setCurrentField('Manufacturador')}>Manufacturador: {currentField === 'Manufacturador' ? <input type='text' name='manufacturador' onChange={setData} defaultValue={currentMachineState.manufacturador} /> : currentMachineState.manufacturador}</ListGroup.Item>
            <ListGroup.Item onClick={() => setCurrentField('Proveedor')}>Proveedor: {currentField === 'Proveedor' ? <input type='text' name='proveedor' onChange={setData} defaultValue={currentMachineState.proveedor} /> : currentMachineState.proveedor}</ListGroup.Item>
            <ListGroup.Item>
              Activo: <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" name='activo' onChange={() => setCurrentMachineState({ ...currentMachineState, status: !currentMachineState?.status })} checked={Boolean(currentMachineState?.status)} />
              </div>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => setCurrentField('Type')}>Tipo: {currentField === 'Type' ? <input type='text' name='type' onChange={setData} defaultValue={currentMachineState.type} /> : currentMachineState.type}</ListGroup.Item>
            <ListGroup.Item onClick={() => setCurrentField('Loc1')}>Unidad de Negocio: {currentField === 'Loc1' ? <input type='text' name='loc1' onChange={setData} defaultValue={currentMachineState.loc1} /> : currentMachineState.loc1}</ListGroup.Item>
            <ListGroup.Item onClick={() => setCurrentField('Loc2')}>Área de Producción: {currentField === 'Loc2' ? <input type='text' name='loc2' onChange={setData} defaultValue={currentMachineState.loc2} /> : currentMachineState.loc2}</ListGroup.Item>
            <ListGroup.Item onClick={() => setCurrentField('Loc3')}>Estación: {currentField === 'Loc3' ? <input type='text' name='loc3' onChange={setData} defaultValue={currentMachineState.loc3} /> : currentMachineState.loc3}</ListGroup.Item>
            <ListGroup.Item onClick={() => setCurrentField('Last_calib')}>
              Última calibración: <strong><u>{currentField === 'Last_calib'
                ? <input type='date' max={dayjs().utc().format('YYYY-MM-DD')} name='last_calibration_date' onChange={setData} defaultValue={dayjs(currentMachineState?.last_calibration_date).utc().format('YYYY-MM-DD')} />
                : dayjs(currentMachineState?.last_calibration_date).format('DD MMM YYYY')}</u></strong>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => setCurrentField('Expira')}>
              Expira: <strong><u>{currentField === 'Expira'
                ? <input type='date' min={dayjs().utc().format('YYYY-MM-DD')} name='expira' onChange={setData} defaultValue={dayjs(currentMachineState?.expira).utc().format('YYYY-MM-DD')} />
                : dayjs(currentMachineState?.expira).format('DD MMM YYYY')}</u></strong>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => setCurrentField('Interval')}>Intervalo tiempo calibración: {currentField === 'Interval' ? <input type='text' name='calibration_interval_define' onChange={setData} defaultValue={currentMachineState.calibration_interval_define} /> : currentMachineState.calibration_interval_define}</ListGroup.Item>
            <ListGroup.Item onClick={() => setCurrentField('Range')}>Rango de trabajo: {currentField === 'Range' ? <input type='text' name='rango_trabajo' onChange={setData} defaultValue={currentMachineState.rango_trabajo} /> : currentMachineState.rango_trabajo}</ListGroup.Item>

            <ListGroup.Item>
              <div className='d-flex align-items-center flex-wrap'>
                <strong className='me-2'>Certificado:</strong>
                {currentMachine?.cargar_certificado ? (
                  <button className='btn btn-sm btn-outline-primary me-2 mb-2' onClick={downloadCertificado}>
                    Descargar Certificado
                  </button>
                ) : (
                  <span className='text-muted me-3 mb-2'>No disponible</span>
                )}
                <button className='btn btn-sm btn-secondary mb-2' onClick={() => setShowUpdateCertificado(true)}>
                  Actualizar Certificado
                </button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      )}

      <div className='d-flex flex-between mt-3'>
        <button onClick={() => router.push('/machine')} className='btn btn-action-primary w-50 ms-auto me-auto'>Regresar</button>
      </div>
      <div className='d-flex flex-between mt-3'>
        <button onClick={downloadImage} className='btn btn-action-primary w-50 ms-auto me-auto'>Generar QR</button>
      </div>
      <div className='d-flex flex-between mt-3'>
        <button onClick={updateCurrentMachine} className='btn btn-action-primary w-50 ms-auto me-auto'>Guardar Cambios</button>
      </div>
    </div>
  );
}
