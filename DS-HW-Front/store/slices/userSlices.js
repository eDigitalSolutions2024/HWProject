import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [],
    total: null,
    currentUser: {},
    currentUserTimeLineActions: [],
    currentUserAttachments:[],
    totalCurrentUserAttachments:null,
    totalCurrentUserTimeLineActions:null,
    currentUserTab: 'actions',
    authUser: {},
    listError: null,
    currentUserError:null,
    currentUserAttachmentsError:null,
    currentUserTimeLineActionsError:null,
    isLoadingList: true,
    isLoadingCurrentUser:false,
    isLoadingCurrentUserTimeLineActions:false,
    isLoadingCurrentUserAttachments:false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers :{
        setUserAuthData: (state,action) => {
            state.authUser = action.payload
        },
        setCurrentUserTab: (state,action) => {
            state.currentUserTab = action.payload
        },
        setUserList: (state, action) => {
            state.isLoadingList = true
        },
        setUserListSuccess: (state, action) => {
            state.list = action.payload.users; 
            state.total = action.payload.total; 
            state.isLoadingList = false
            state.listError = null
        },
        setUserListError: (state, action) => {
            state.listError = action.payload.error,
            state.isLoadingList = false
        },

        setCurrentUser: (state, action) => {
            state.isLoadingCurrentUser = true
        },
        setCurrentUserSuccess: (state, action) => {
            state.currentUser= action.payload
            state.isLoadingCurrentUser = false
            state.currentUserError = null
        },
        setCurrentUserError: (state, action) => {
            state.currentUserError = action.payload.error,
            state.isLoadingCurrentUser = false
        },

        setCurrentUserTimeLineActions: (state, action) => {
            state.isLoadingCurrentUserTimeLineActions = true
        },
        setCurrentUserTimeLineActionsSuccess: (state, action) => {
            state.currentUserTimeLineActions= action.payload.actions
            state.isLoadingCurrentUserTimeLineActions = false
            state.totalCurrentUserTimeLineActions = action.payload.total
            state.currentUserTimeLineActionsError = null
        },
        setCurrentUserTimeLineActionsError: (state, action) => {
            state.currentUserTimeLineActionsError = action.payload.error,
            state.isLoadingCurrentUserTimeLineActions = false
        },
        setUserAttachments: (state, action) => {
            state.isLoadingCurrentUserAttachments = true 
        },
        setUserAttachmentsSuccess: (state, action) => {
            state.isLoadingCurrentUserAttachments = false, 
            state.currentUserAttachments = action.payload.attachments
            state.totalCurrentUserAttachments = action.payload.total
            state.currentUserAttachmentsError = null
        },
        setUserAttachmentsError: (state, action) => {
            state.isLoadingCurrentUserAttachments = false,
            state.currentUserAttachmentsError = action.payload.error
        },
    }
 })




export const { setUserAuthData, setUserList, setUserListSuccess, setUserListError, setCurrentUser, setCurrentUserSuccess, setCurrentUserError, setCurrentUserTab, setCurrentUserTimeLineActions, setCurrentUserTimeLineActionsSuccess, setCurrentUserTimeLineActionsError, setUserAttachments, setUserAttachmentsSuccess, setUserAttachmentsError } = userSlice.actions
export default userSlice.reducer;