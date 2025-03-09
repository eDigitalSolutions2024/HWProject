import React from 'react'
import Image from 'next/image'
import LoginForm from "@components/LoginForm/LoginForm"

const Page = () => {
    return (
        <div className='login-container d-flex justify-content-center align-items-center'>
            <div className='row login-form card p-0 border-0 shadow-lg'>
                <div className=' col-12 col-lg-6 login-form_left-container position-relative' sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw">
                    {/* <Image src="/hwlogo.png" alt="login-logo" fill={true} /> */}
                </div>
                <div className='col-12 col-lg-6 login-form_right-container'>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default Page