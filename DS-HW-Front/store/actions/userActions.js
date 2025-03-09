import { getUserListApi, createUserApi, updateUserApi, getCurrentUser, updateUserImageApi, getTimeLineActionsByUserIdApi, getCurrentUserAttachmentsApi, createNewUserAttachmentApi, deleteUserAttachmentApi, updateUserByAdminApi } from "api/users"
import { setUserList, setUserListSuccess, setUserListError, setUserAuthData, setCurrentUser, setCurrentUserSuccess, setCurrentUserError, setCurrentUserTab, setCurrentUserTimeLineActions, setCurrentUserTimeLineActionsSuccess, setCurrentUserTimeLineActionsError, setUserAttachments, setUserAttachmentsSuccess, setUserAttachmentsError } from '../slices/userSlices'
import { toast } from "react-toastify";
import { ToastSuccess, ToastError } from '@components/shared/Toast';

export const setUserAuthDataAction = (data) => {
    return async(dispatch) => {
         dispatch(setUserAuthData(data));
    }
 }

 export const setCurrentUserTabAction = (data) => {
    return async(dispatch) => {
         dispatch(setCurrentUserTab(data));
    }
 }
 
export const getUserListAction = (page = 1, search = "", role = "", limit) => {
   return async(dispatch) => {
        dispatch(setUserList());
        try {
            const response = await getUserListApi(page < 0 ? 1 : page, search, role, limit);
            if(response.status)dispatch(getUserListError({error: `Error: ${response.msg} `}))
            else dispatch(setUserListSuccess(response))
        } catch (error) {
            console.log("Error: ", error)
            dispatch(setUserListError({error: `Error: ${error} `}))
        }
   }
}

export const createUserAction = (data) => {
    return async(dispatch) => {
        dispatch(setUserList());
        try {
            await createUserApi(data);
            const response = await getUserListApi();
            if(response.status)dispatch(getUserListError({error: `Error: ${response.msg} `}))
            else dispatch(setUserListSuccess(response))
        } catch (error) {
            dispatch(setUserListError({error: `Error: ${error} `}))
        }
   }
}

export const updateUserAction = (data) => {
    return async(dispatch ) => {
        dispatch(setCurrentUser());
        try {
            await updateUserApi(data);
            const response = await getCurrentUser(data.id);
            dispatch(setCurrentUserSuccess(response))
        } catch (error) {
            dispatch(setCurrentUserError({error: `Error: ${error} `}))
        }
   }
}

export const updateUserByAdminAction = (data) => {
    return async(dispatch ) => {
        dispatch(setCurrentUser());
        try {
            await updateUserByAdminApi(data);
            const response = await getCurrentUser(data.id);
            dispatch(setCurrentUserSuccess(response))
        } catch (error) {
            dispatch(setCurrentUserError({error: `Error: ${error} `}))
        }
   }
}


export function setCurrentUserAction(id = '') {
    return async(dispatch ) => {
        dispatch(setCurrentUser())
        try {
            if (id) {
                const response = await getCurrentUser(id);
                
                dispatch(setCurrentUserSuccess(response));
            } else {
                dispatch(setCurrentUserSuccess({}))
            }
        } catch (error) {
            console.log(error);
            dispatch(setCurrentUserError({error: `Error: ${error} `}))
        }
    }
}


export function updateUserImageAction(id, file) {
    return async(dispatch) => {
        dispatch(setCurrentUser())
        try {
            if (id) {
                await updateUserImageApi(id, file);
                const response = await getCurrentUser(id);
                dispatch(setCurrentUserSuccess(response))
            }
        } catch (error) {
            console.log(error);
            dispatch(updateUserImageError({error: `Error: ${error} `}))
        }
    }
}

export function getUserTimeLineActionsAction(userId, page , target, description, startdate, enddate, actiontype, limit){
    return async(dispatch) => {
        dispatch(setCurrentUserTimeLineActions())
        try {
            if (userId) {
                const response = await getTimeLineActionsByUserIdApi(userId, page , target, description, startdate, enddate, actiontype, limit);
                dispatch(setCurrentUserTimeLineActionsSuccess(response))
            }
        } catch (error) {
            console.log(error);
            dispatch(setCurrentUserTimeLineActionsError({error: `Error: ${error} `}))
        }
    }
}

export function getCurrentUserAttachmentsAction(userId){
    return async(dispatch) => {
        dispatch(setUserAttachments())
        try {
            if (userId) {
                const response = await getCurrentUserAttachmentsApi(userId);
                dispatch(setUserAttachmentsSuccess(response))
            }
        } catch (error) {
            console.log(error);
            dispatch(setUserAttachmentsError({error: `Error: ${error} `}))
        }
    }
}

export function createNewUserAttachmentAction(userId, files){
    return async(dispatch) => {
        dispatch(setUserAttachments())
        const id = toast.loading("Cargando...")
        try { 
            if (userId) {
                await createNewUserAttachmentApi(userId, files);
                const response = await getCurrentUserAttachmentsApi(userId);
                ToastSuccess(id, "Los Archivos se han agregado correctamente")
                dispatch(setUserAttachmentsSuccess(response))
            }
        } catch (error) {
            console.log(error);
            ToastError(id, "Hubo Un problema con la carga de Archivos")
            dispatch(setUserAttachmentsError({error: `Error: ${error} `}))
        }
    }
}

export function removeCurrentUserAction(attachmentId){
    return async(dispatch) => {
        dispatch(setUserAttachments())
        const id = toast.loading("Cargando...")
        try { 
            if (userId) {
                await createNewUserAttachmentApi(userId, files);
                const response = await getCurrentUserAttachmentsApi(userId);
                ToastSuccess(id, "Los Archivos se han agregado correctamente")
                dispatch(setUserAttachmentsSuccess(response))
            }
        } catch (error) {
            console.log(error);
            ToastError(id, "Hubo Un problema con la carga de Archivos")
            dispatch(setUserAttachmentsError({error: `Error: ${error} `}))
        }
    }
}

export function deleteUserAttachmentAction(userId, attachmentId){
    return async(dispatch) => {
        dispatch(setUserAttachments())
        const id = toast.loading("Cargando...")
        try { 
            if (userId) {
                await deleteUserAttachmentApi(userId, attachmentId);
                const response = await getCurrentUserAttachmentsApi(userId);
                ToastSuccess(id, "El archivo se a eliminado correctamente")
                dispatch(setUserAttachmentsSuccess(response))
            }
        } catch (error) {
            console.log(error);
            ToastError(id, "Hubo Un problema con la carga de Archivos")
            dispatch(setUserAttachmentsError({error: `Error: ${error} `}))
        }
    }
}