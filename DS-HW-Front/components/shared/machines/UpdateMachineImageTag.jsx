import React from 'react';
//Redux
import { useDispatch, useSelector } from 'react-redux';
// import { updateUserImageAction,  setCurrentUserAction } from '../../store/actions/usersAction';
import { updateMachineTagImageAction } from '@machineActions';
//form
import { useForm } from "react-hook-form";

const UpdateMachineTagImageForm = ({ setShow }) => {
    const dispatch = useDispatch();
    const currentMachine = useSelector(state => state.machine.currentMachine)
    const { register, formState: { errors }, handleSubmit } = useForm();

    const uploadDocument = async formData => {
        const { file } = formData;
        await dispatch(updateMachineTagImageAction(currentMachine._id, file[0]))
        setShow(false)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(uploadDocument)}>
                <div className='d-flex flex-column flex-between w-100'>
                    <input name='file' type='file' className='form-control' {...register("file", { required: { value: true, message: 'El archivo es obligatorio' } })}></input>
                    <span className='text-danger text-small d-block mb-2'>{errors?.file?.message}</span>
                </div>
                <div className='d-flex justify-content-center'>
                    <button type="submit" className='btn btn-action-primary w-auto my-4'>Agregar Documento</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateMachineTagImageForm