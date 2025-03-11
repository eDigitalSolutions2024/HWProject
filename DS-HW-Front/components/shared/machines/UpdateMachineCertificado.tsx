import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMachineImageAction } from '@machineActions'; // 🧠 You'll need to implement this action
import { useForm } from 'react-hook-form';

const UpdateMachineCertificate = ({ setShow }, p0: any) => {
    const dispatch = useDispatch();
    const currentMachine = useSelector((state: { machine: { currentMachine: any } }) => state.machine.currentMachine);
    const { register, formState: { errors }, handleSubmit } = useForm();

    const uploadCertificate = async (formData) => {
        const { file } = formData;
        dispatch(UpdateMachineCertificate(currentMachine._id, file[0]));
        setShow(false);
    };

    return (
        <form onSubmit={handleSubmit(uploadCertificate)}>
            <div className='d-flex flex-column flex-between w-100'>
                <input name='file' type='file' className='form-control' 
                    accept=".pdf,.png,.jpg,.jpeg" 
                    {...register("file", { required: "El certificado es obligatorio" })} />
                <span className='text-danger text-small d-block mb-2'>{errors?.file?.message?.toString()}</span>
            </div>
            <div className='d-flex justify-content-center'>
                <button type="submit" className='btn btn-action-primary w-auto my-4'>Actualizar Certificado</button>
            </div>
        </form>
    );
};

export default UpdateMachineCertificate;
