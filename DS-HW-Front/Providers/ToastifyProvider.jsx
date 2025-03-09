import { ToastContainer } from 'react-toastify';

const ToastifyProvider = ({ children }) => {
    return (
        <>
            <ToastContainer
                position='top-right'
                autoClose={500}
                hideProgressBar={false}
                closeOnClick
                draggable
                pauseOnHover
                pauseOnFocusLoss
                theme='dark' />
            {children}
        </>
    )
}

export default ToastifyProvider