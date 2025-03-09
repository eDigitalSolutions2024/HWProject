import React from 'react';
import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc')
//Redux
import ToolTip from '../shared/ToolTip'
import { useDispatch, useSelector } from 'react-redux';
import Required from '../shared/Required'
//form
import { useForm } from "react-hook-form";
//actions
import { updateUserAction, createUserAction, setCurrentUserAction, updateUserByAdminAction } from '@userActions'

const UserForm = (props) => {
    dayjs.extend(utc)
    const dispatch = useDispatch();
    const { user, setShow } = props;
    const { register, formState: { errors }, handleSubmit } = useForm();
    const rolesList = useSelector(state => state.role.list)
    const authUser = useSelector(state => state.user.authUser)
    const processData = async (data) => {
        if (user) {
            data.birthDate ? data.birthDate : data.birthDate = user.birthDate;
            data.entryDate ? data.entryDate : data.entryDate = user.entryDate;
            if (user._id == authUser._id) {
                await dispatch(updateUserAction({ ...data, id: user?._id }))
            } else if (authUser.role.updatePermissions.includes('users') || authUser.role.role === 'ADMIN_ROLE') {
                data.role === 'default' ? data.role = user.role._id : data.role = data.role;
                await dispatch(updateUserByAdminAction({ ...data, id: user?._id }))
            }
        } else {
            console.log("create")
            await dispatch(createUserAction(data))
        }
        setShow(false);
    }

    return (
        <div className='mx-2'>
            <form onSubmit={handleSubmit(processData)}>
                <div className="mb-3">
                    <Required />
                </div>
                <div className='d-flex flex-between w-100'>
                    <div className='d-flex flex-column w-100 me-2'>
                        <label className='input-label me-2'><span className="color-primary h5" >*</span>  Nombre</label>
                        <input name='firstName' type="text" placeholder='Nombre' defaultValue={user ? user.firstName : null} className='form-control my-2' {...register("firstName", { required: { value: true, message: 'El Nombre es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.firstName?.message}</span>
                    </div>
                    <div className='d-flex flex-column w-100 ms-2'>
                        <label className='input-label'><span className="color-primary h5">*</span>  Apellido</label>
                        <input name='lastName' type="text" placeholder='Apellido' defaultValue={user ? user.lastName : null} className='form-control my-2' {...register("lastName", { required: { value: true, message: 'El Apellido es obligatorio' }, minLength: { value: 2, message: "Min lenght 2" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.lastName?.message}</span>
                    </div>
                </div>
                <div className='d-flex flex-between w-100'>
                    <div className='d-flex flex-column w-100 me-2'>
                        <div className='d-flex align-items-center'>
                            <label className='input-label me-2'><span className="color-primary h5">*</span> Email</label>
                            <ToolTip placement="right" description="correo@dominio" />
                        </div>
                        <input name='email' type="email" defaultValue={user ? user.email : null} placeholder='Ingresa el email de el usuario'
                            className='form-control my-2'
                            {...register("email", { required: { value: true, message: 'El email es obligatorio' }, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Type a valid email" } })} />
                        <span className='text-danger text-small d-block mb-2'>{errors?.email?.message}</span>
                    </div>
                    {
                        user ? null : <Password register={register} errors={errors} />
                    }
                </div>
                {
                    user
                        ? <UpdateDates register={register} errors={errors} user={user} />
                        : <CreateDates register={register} errors={errors} />
                }
                {authUser?.role?.role === 'ADMIN_ROLE' && (
                    <div className='d-flex flex-between w-100 align-items-center'>
                        <div className='d-flex flex-column w-100 mb-1 me-2'>
                            <label className='input-label mb-2'><span className="color-primary h5">*</span>  Puesto</label>
                            <select name='role' defaultValue={user ? user?.role?._id : 'default'} className='form-select' {...register("role", { required: { value: true, message: 'El puesto es obligatorio' } })}>
                                <option value='default'>Selecciona el puesto del empleado</option>
                                {
                                    rolesList?.map((data, index) => (
                                        <option key={index} value={data?._id}> {data?.role} </option>
                                    ))
                                }
                            </select>
                            <span className='text-danger text-small d-block mb-2'>{errors?.role?.message}</span>
                        </div>
                    </div>
                )}
                {
                    user
                        ? <EditButtons />
                        : <CreateButtons />
                }
            </form>
        </div>
    );
}
function EditButtons() {
    return (
        <div className='d-flex flex-between'>
            <button type="submit" className='btn btn-action-primary w-50 ms-auto me-auto'>Actualizar</button>
        </div>
    )
}
function CreateButtons(props) {
    return (
        <div className='d-flex justify-content-end'>
            <button type="submit" className='btn btn-action-primary w-auto my-4'>Nuevo Usuario</button>
        </div>
    )
}

function UpdateDates(props) {
    const { register, errors, user } = props;
    return (
        <div className='d-flex flex-between w-100'>
            <div className='d-flex flex-column w-100 me-2'>
                <label className='input-label'><span className="color-primary h5">*</span>  Fecha de nacimiento</label>
                <input name='birthDate' type="date" placeholder='Fecha de nacimiento' max={dayjs().utc().format('YYYY-MM-DD')} defaultValue={dayjs(user?.birthDate).utc().format('YYYY-MM-DD')} className='form-control my-2' {...register("birthDate")} />
                <span className='text-danger text-small d-block mb-2'>{errors?.birthDate?.message}</span>
            </div>
            <div className='d-flex flex-column w-100 ms-2'>
                <label className='input-label'><span className="color-primary h5">*</span>  Fecha de ingreso</label>
                <input name='entryDate' type="date" placeholder='Fecha de ingreso' max={dayjs().utc().format('YYYY-MM-DD')} defaultValue={dayjs(user?.entryDate).utc().format('YYYY-MM-DD')} className='form-control my-2' {...register("entryDate")} />
                <span className='text-danger text-small d-block mb-2'>{errors?.entryDate?.message}</span>
            </div>
        </div>
    )
}
function CreateDates(props) {
    const { register, errors } = props;
    return (
        <div className='d-flex flex-between w-100'>
            <div className='d-flex flex-column w-100 me-2'>
                <label className='input-label'><span className="color-primary h5">*</span> Fecha de nacimiento</label>
                <input name='birthDate' type="date" placeholder='Fecha de nacimiento' max={dayjs().format('YYYY-MM-DD')} className='form-control my-2' {...register("birthDate", { required: { value: true, message: 'La fecha de cumpleaños es obligatoria' } })} />
                <span className='text-danger text-small d-block mb-2'>{errors?.birthDate?.message}</span>
            </div>
            <div className='d-flex flex-column w-100 ms-2'>
                <label className='input-label'><span className="color-primary h5">*</span> Fecha de ingreso</label>
                <input name='entryDate' type="date" placeholder='Fecha de ingreso' max={dayjs().format('YYYY-MM-DD')} className='form-control my-2' {...register("entryDate", { required: { value: true, message: 'La fecha de ingreso es obligatoria' } })} />
                <span className='text-danger text-small d-block mb-2'>{errors?.entryDate?.message}</span>
            </div>
        </div>
    )
}

function Password(props) {
    const { register, errors } = props;
    return (
        <div className='d-flex flex-column w-100 ms-2'>
            <div >
                <label className='input-label me-2'><span className="color-primary h5">*</span> Contraseña</label>
                <ToolTip placement="right" description="Minimo 6 caracteres" />
            </div>
            <input name='password' type="password" placeholder='Ingresa la Contraseña' className='form-control my-2' {...register("password", { required: { value: true, message: 'La contraseña es obligatoria' }, minLength: { value: 6, message: "Min lenght 6" } })} />
            <span className='text-danger text-small d-block mb-2'>{errors?.password?.message}</span>
        </div>
    )
}

export default UserForm
