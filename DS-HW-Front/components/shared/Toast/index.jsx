import { toast } from "react-toastify";

export const ToastSuccess = (id, message) => {
    return (
        toast.update(id, { render: `${message}`, type: "success", autoClose: 2000, hideProgressBar: true, closeButton: true, closeOnClick: true, isLoading: false })
    )
}
export const ToastError = (id, message) => {
    return (
        toast.update(id, { render: `${message}`, type: "error", autoClose: 2000, hideProgressBar: true, closeButton: true, closeOnClick: true, isLoading: false })
    )
}
