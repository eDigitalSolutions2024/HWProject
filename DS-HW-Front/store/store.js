import { configureStore } from "@reduxjs/toolkit";
import userSlices from "./slices/userSlices";
import RoleSlices from "./slices/roleSlice";
import machineSlice from "./slices/machineSlice";;


export const store = configureStore({
    reducer: {
        user: userSlices,
        role:RoleSlices,
        machine: machineSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
    devTools: process.env.NODE_ENV !== "production",
});
