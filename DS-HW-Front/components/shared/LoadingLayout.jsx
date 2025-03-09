import { PacmanLoader } from "react-spinners"
import { CSSProperties } from "react"
const LoadingLayout = ({ loading }) => {
    return (
        <div className="d-flex justify-content-center mt-3">
            <PacmanLoader color='#00243D' size={150} speedMultiplier={5} loading={loading} />
        </div>
    )
}

export default LoadingLayout
