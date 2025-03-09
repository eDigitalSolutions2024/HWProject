'use client'
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ToastSuccess, ToastError } from '@components/shared/Toast';
import { loginApi } from '@Api/login'
import { login } from "@Utilities/token"
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { setUserAuthData } from '@store/slices/userSlices';
import Image from 'next/image'
import hwImage from '@images/hw-text.png'

const LoginForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const processData = async (data, e) => {
        const id = toast.loading("Cargando...")
        const response = await loginApi(data);
        const { token } = response;
        if (token) {
            login(token)
                .then(response => {
                    dispatch(setUserAuthData(response))
                    ToastSuccess(id, "Bienvenido a Honeywell")
                    router.push('/')
                })
                .catch(error => ToastError(id, "Verifica la informacion de usuario"))
        } else {
            ToastError(id, "Verifica la informacion de usuario")
        }
        e.target.reset();
    }
    return (
        <div className='login_form px-2'>
            <div className='d-flex flex-column justify-content-center login_form_header mx-5'>
                <h1 className='text-center'>Bienvenido a</h1>
                <Image alt='fenrir-image' src={hwImage} width={1513} height={619} style={{ width: '100%', height: '100%' }} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>
            <div className='login_form_inputs px-1'>
                <form onSubmit={handleSubmit(processData)}>
                    <div className='my-4'>
                        <div className='d-flex align-items-center form-control rounded'>
                            <i className='fa-solid fa-user'></i>
                            <input name='email' type="email" placeholder='Enter your user Email' className='mx-2 login_form_inputs--input'
                                {...register("email", { required: { value: true, message: 'El correo es obligatorio' }, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Ingrese un correo valido." } })} />
                        </div>
                        <span className='text-danger text-small d-block mb-2'>{errors?.email?.message}</span>
                    </div>
                    <div className='my-4'>
                        <div className='d-flex align-items-center form-control rounded'>
                            <i className='fa-solid fa-key'></i>
                            <input name='password' type="password" placeholder='Enter your Password' className='mx-2 login_form_inputs--input'
                                {...register("password", { required: { value: true, message: 'La contraseña es obligatoria.' }, minLength: { value: 6, message: "La contraseña debe ser mayor a 6 caracteres." } })} />
                        </div>
                        <span className='text-danger text-small d-block mb-2'>{errors?.password?.message}</span>
                    </div>
                    <button className='btn btn-action-primary w-100'>Ingresar</button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;


