import { getRoleListApi } from "@Api/roles";
import { setRoleList, setRoleListSuccess, setRoleListError } from "@store/slices/roleSlice";


export const getRoleListAction = (page = 1, search = "", role = "", limit) => {
    return async(dispatch, getState ) => {
         dispatch(setRoleList());
         try {
             const response = await getRoleListApi();
             if(response.status)dispatch(setRoleListError({error: `Error: ${response.msg} `}))
             else dispatch(setRoleListSuccess(response))
         } catch (error) {
             dispatch(setRoleListError({error: `Error: ${error} `}))
         }
    }
 }