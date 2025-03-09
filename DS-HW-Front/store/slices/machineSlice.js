import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [],
    total: null,
    currentMachine: {},
    currentMachineAttachments: [],
    totalCurrentMachineAttachments:null,
    machine: [],
    listError:null,
    currentMachineError:null,
    currentMachineAttachmentsError:null,
    isLoadingList:true,
    isLoadingCurrentMachine:false,
    isLoadingCurrentMachineAttachments:false
}

const machineSlice = createSlice({
    name: 'machine',
    initialState,
    reducers: {
        setMachineData: (state, action) => {
            state.machine = action.payload
        },
        setMachineList: (state, action) => {
            state.isLoadingList = true
        },
        setMachineListSuccess: (state, action) => {
            state.list = action.payload.machine; 
            state.total = action.payload.total; 
            state.isLoadingList = false
            state.listError = null
        },
        setMachineListError: (state, action) => {
            state.listError = action.payload.error,
            state.isLoadingList = false
        },

        setCurrentMachine: (state, action) => {
            state.isLoadingCurrentMachine = true
        },
        setCurrentMachineSuccess: (state, action) => {
            state.currentMachine= action.payload
            state.isLoadingCurrentMachine = false
            state.currentMachineError = null
        },
        setCurrentMachineError: (state, action) => {
            state.currentMachineError = action.payload.error,
            state.isLoadingCurrentMachine = false
        },
        setMachineAttachments: (state, action) => {
            state.isLoadingCurrentMachineAttachments = true 
        },
        setMachineAttachmentsSuccess: (state, action) => {
            state.isLoadingCurrentMachineAttachments = false, 
            state.currentMachineAttachments = action.payload.attachments
            state.totalCurrentMachineAttachments = action.payload.total
            state.currentMachineAttachmentsError = null
        },
        setMachineAttachmentsError: (state, action) => {
            state.isLoadingCurrentMachineAttachments = false,
            state.currentMachineAttachmentsError = action.payload.error
        },
    }
})

export const { setMachineData, setUserAuthData, setCurrentMachine,setCurrentMachineError,setCurrentMachineSuccess,setMachineAttachments,setMachineAttachmentsError,setMachineAttachmentsSuccess,setMachineList,setMachineListError,setMachineListSuccess } = machineSlice.actions
export default machineSlice.reducer;