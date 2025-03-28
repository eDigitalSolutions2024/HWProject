import auth from "./authRoutes"
import role from "./roleRoutes"
import user from "./userRoutes"
import attachment from './attachmentRoutes'
import transportType from "./transportTypeRoutes"
import calibration from "./calibrationRoutes"
import folder from "./folderRoutes" // ✅ Añadir esta línea

export const authRoutes = auth
export const userRoutes = user
export const roleRoutes = role
export const attachmentRoutes = attachment
export const transportTypeRoutes = transportType
export const calibrationRoutes = calibration
export const folderRoutes = folder // ✅ Añadir esta línea
