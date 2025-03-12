import React from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateMachineByIdAction } from '@machineActions';
// Form
import { useForm } from "react-hook-form";

const UpdateMachineCertificado = ({ setShow }) => {
  const dispatch = useDispatch();
  const currentMachine = useSelector((state: { machine: { currentMachine: any } }) => state.machine.currentMachine);
  const { register, formState: { errors }, handleSubmit } = useForm();

  const uploadCertificado = async (formData) => {
    const { file } = formData;
    await dispatch(updateMachineByIdAction(currentMachine._id, file[0]) as any);
    setShow(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(uploadCertificado)}>
        <div className='d-flex flex-column flex-between w-100'>
          <input
            name='file'
            type='file'
            accept='.pdf'
            className='form-control'
            {...register("file", {
              required: { value: true, message: 'El archivo es obligatorio' }
            })}
          />
          <span className='text-danger text-small d-block mb-2'>
            {errors?.file?.message}
          </span>
        </div>
        <div className='d-flex justify-content-center'>
          <button type="submit" className='btn btn-action-primary w-auto my-4'>
            Agregar Certificado
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMachineCertificado;
