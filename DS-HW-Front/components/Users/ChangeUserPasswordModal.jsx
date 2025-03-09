import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import useAuth from './../../hooks/useAuth';

const ChangeUserPassword = ({ id, setShow }) => {
  const { register, formState: { errors }, handleSubmit, watch } = useForm();
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const processData = async (data, e) => {


  }
  const validatePassword = (value) => {
    const confirmPassword = watch("confirmPassword");
    if (value !== confirmPassword) {
      return "Las contraseñas no coinciden.";
    }
  };

  return (
    <form onSubmit={handleSubmit(processData)}>
      <div>
        <div className='d-flex align-items-center form-control mt-4 rounded'>
          <i className='fa-solid fa-key'></i>
          <input name='password' type={showPassword ? "text" : "password"} placeholder='Nueva Contraseña' className='mx-2 login_form_inputs--input'
            {...register("password", { required: { value: true, message: 'La contraseña es obligatoria.' }, minLength: { value: 6, message: "Min lenght 6" }, validate: validatePassword })} />
          <button type='button' className='border-0 bg-transparent' onClick={() => setShowPassword(!showPassword)}>
            <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>
        <span className='text-danger text-small d-block'>{errors?.password?.message}</span>
      </div>
      <div>
        <div className='d-flex align-items-center form-control mt-4 rounded'>
          <i className='fa-solid fa-key'></i>
          <input name='confirmPassword' type={showConfirmPassword ? "text" : "password"} placeholder='Confirmar Contraseña' className='mx-2 login_form_inputs--input'
            {...register("confirmPassword", { required: { value: true, message: 'La contraseña es obligatoria.' }, minLength: { value: 6, message: "Min lenght 6" }, validate: validatePassword })} />
          <button type='button' className='border-0 bg-transparent' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>
        <span className='text-danger text-small d-block'>{errors?.confirmPassword?.message}</span>
      </div>
      <div className="flex-end mt-4">
        <button className="btn w-100 btn-action-primary">Guardar</button>
      </div>
    </form>
  )
}

export default ChangeUserPassword