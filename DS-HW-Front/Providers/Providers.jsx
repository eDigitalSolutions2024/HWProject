"use client";

import React from 'react'
import ReduxProvider from './ReduxProvider'
import ToastifyProvider from './ToastifyProvider';

const Providers = ({ children }) => {

    return (
        <>
            <ReduxProvider>
                <ToastifyProvider />
                {children}
            </ReduxProvider>
        </>
    )
}

export default Providers