import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { createNewUserAttachmentAction } from '@userActions';
import DropFileUpload from '@components/shared/DropFileUpload';

const NewAttachmentForm = ({ setShow }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const [files, setFiles] = useState([])
  const { register, formState: { errors }, handleSubmit } = useForm();
  const uploadDocument = async formData => {
    await dispatch(createNewUserAttachmentAction(user._id, files))
    setShow(false)
  }

  useEffect(() => {
    console.log(files)
  }, [files])


  return (
    <div>
      <form onSubmit={handleSubmit(uploadDocument)}>
        <DropFileUpload onChange={response => setFiles(previousFiles => [...previousFiles, ...response])} showFiles />
        <div className='d-flex justify-content-center'>
          <button type="submit" className='btn btn-action-primary w-auto my-4'>Agregar Documento</button>
        </div>
      </form>
    </div>
  )
}

export default NewAttachmentForm