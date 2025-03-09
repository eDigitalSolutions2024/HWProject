import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [],
    completeRoles: [],
    currentRole: {},
    total: null,
    error: null,
    isLoadingRoleList:false
}


const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers :{
        setRoleList: (state, action) => {
            state.isLoadingList = true
        },
        setRoleListSuccess: (state, action) => {
            state.list = action.payload.roles; 
            state.total = action.payload.total; 
            state.isLoadingList = false
        },
        setRoleListError: (state, action) => {
            state.listError = action.payload.error,
            state.isLoadingList = false
        }
    }
 })




export const { setRoleList, setRoleListSuccess, setRoleListError } = roleSlice.actions
export default roleSlice.reducer;