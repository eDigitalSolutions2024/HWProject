import { getMachineListApi, getMachineById, deleteMachine, 
        updateMachineByAdminApi, getAllMachineListApi, updateMachineImageApi, updateMachineTagImageApi, createMachineApi } from "@Api/machine"
import { setUserAuthData,setCurrentMachine,setCurrentMachineError,setCurrentMachineSuccess,setMachineAttachments,setMachineAttachmentsError,setMachineAttachmentsSuccess,setMachineList,setMachineListError,setMachineListSuccess, setMachineData } from '../slices/machineSlice'
import { toast } from "react-toastify";
import { ToastSuccess, ToastError } from '@components/shared/Toast';

 export const setCurrentMachineAction = (id='') => {
    return async(dispatch) => {
         dispatch(setCurrentMachine());
         try {
            if(id) {
                const response = await getMachineById(id);
                dispatch(setCurrentMachineSuccess(response));
            } else {
                dispatch(setCurrentMachineSuccess({}))
            }
         } catch (error) {
             console.log("Error: ", error)
             dispatch(setCurrentMachineError({error: `Error: ${error} `}))
         }
    }
 }

export const getMachineListAction = () => {
    return async(dispatch) => {
         dispatch(setMachineList());
         try {
            //page < 0 ? 1 : page, search, role, limit
             const response = await getMachineListApi();
             dispatch(setMachineListSuccess(response))
         } catch (error) {
             console.log("Error: ", error)
             dispatch(setMachineListError({error: `Error: ${error} `}))
         }
    }
 }

 export const getAllMachineListAction = () => {
    return async(dispatch) => {
         dispatch(setMachineList());
         try {
            //page < 0 ? 1 : page, search, role, limit
             const response = await getAllMachineListApi();
             dispatch(setMachineListSuccess(response))
         } catch (error) {
             console.log("Error: ", error)
             dispatch(setMachineListError({error: `Error: ${error} `}))
         }
    }
 }

 export const deleteMachineByidAction = (id) => {
    return async(dispatch) => {
        dispatch(setMachineList());
        try {
            await deleteMachine(id);
            const response = await getMachineListApi();
            dispatch(setMachineListSuccess(response))
        } catch (error) {
            console.log("Error: ", error)
            dispatch(setMachineListError({error: `Error: ${error} `}))
        }
   }
 }

 export const updateMachineByIdAction = (data) => {
    return async(dispatch) => {
        dispatch(setCurrentMachine());
        try {
            const id = `${data?._id}`;

            await updateMachineByAdminApi(data);
  
            const response = await getMachineById(id);
            
            dispatch(setCurrentMachineSuccess(response))
        } catch (error) {
            console.log("Error: ", error)
            dispatch(setCurrentMachineError({error: `Error: ${error} `}))
        }
   }
 }

 export function updateMachineImageAction(id, file) {
    return async(dispatch) => {
        dispatch(setCurrentMachine())
        try {
            if (id) {
                await updateMachineImageApi(id, file);
                const response = await getMachineById(id);
                dispatch(setCurrentMachineSuccess(response))
            }
        } catch (error) {
            console.log(error);
            dispatch(setCurrentMachineError({error: `Error: ${error} `}))
        }
    }
}
export function updateMachineTagImageAction(id, file) {
    return async(dispatch) => {
        dispatch(setCurrentMachine())
        try {
            if (id) {
                await updateMachineTagImageApi(id, file);
                const response = await getMachineById(id);
                dispatch(setCurrentMachineSuccess(response))
            }
        } catch (error) {
            console.log(error);
            dispatch(setCurrentMachineError({error: `Error: ${error} `}))
        }
    }
}

export const createMachineAction = (data) => {
    return async(dispatch) => {
        dispatch(setMachineList());
        try {
            await createMachineApi(data);
            const response = await getMachineListApi();
            console.log('response :>> ', response);
            if(response.status)dispatch(setMachineListError({error: `Error: ${response.msg} `}))
            else dispatch(setMachineListSuccess(response))
        } catch (error) {
            dispatch(setMachineListError({error: `Error: ${error} `}))
        }
    }
}
