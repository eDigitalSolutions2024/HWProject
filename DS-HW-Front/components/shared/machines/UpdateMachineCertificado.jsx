import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { updateMachineCertificadoAction } from '@machineActions';

const UpdateMachineCertificado = ({ setShow }) => {
  const dispatch = useDispatch();
  const currentMachine = useSelector(state => state.machine.currentMachine);
  const { register, formState: { errors }, handleSubmit } = useForm();

  const uploadCertificado = async (formData) => {
    const { file } = formData;
    await dispatch(updateMachineCertificadoAction(currentMachine._id, file[0]));
    setShow(false);
  };

  return (
    <form onSubmit={handleSubmit(uploadCertificado)}>
      <div className='d-flex flex-column flex-between w-100'>
        <input
          type='file'
          accept='application/pdf'
          className='form-control'
          {...register("file", {
            required: { value: true, message: 'El archivo es obligatorio' }
          })}
        />
        <span className='text-danger text-small d-block mb-2'>{errors?.file?.message}</span>
      </div>
      <div className='d-flex justify-content-center'>
        <button type="submit" className='btn btn-action-primary w-auto my-4'>Actualizar Certificado</button>
      </div>
    </form>
  );
};

export default UpdateMachineCertificado;
