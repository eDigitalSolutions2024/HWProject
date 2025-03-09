import React, { useState, useEffect } from 'react'
import AttachmentTable from './AttachmentTable'
import { getCurrentUserAttachmentsAction } from '@userActions';
import { useSelector, useDispatch } from 'react-redux';
import NoDataFound from '../shared/NoDataFound';
import Loading from '@components/shared/Loading';
import Modal from '../shared/Modal';
import NewAttachmentForm from './NewAttachmentForm';

const CurrentUserAttachment = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const user = useSelector(state => state.user.currentUser);
  const attachments = useSelector(state => state.user.currentUserAttachments);
  const total = useSelector(state => state.user.totalCurrentUserAttachments);
  const isLoading = useSelector(state => state.user.isLoadingCurrentUserAttachments);
  useEffect(() => {
    dispatch(getCurrentUserAttachmentsAction(user._id))
  }, [])

  return (
    <div className='mt-5 card shadow '>
      <div className='d-flex flex-between'>
        <div>
          <h4>Total de Archivos: {total}</h4>
        </div>
        <button className='btn btn-primary mb-5' onClick={() => setShow(true)}><span className='bi bi-plus-lg h5' /></button>
      </div>

      {
        isLoading
          ? <Loading />
          : attachments?.length > 0 ? <AttachmentTable /> : <NoDataFound className="mt-5" />
      }
      <Modal title="Nuevo Documento" show={show} setShow={setShow}>
        <NewAttachmentForm setShow={setShow} />
      </Modal>
    </div>
  )
}

export default CurrentUserAttachment