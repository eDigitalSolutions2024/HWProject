
import { RingLoader } from "react-spinners"

const Loading = ({ loading }) => {
    return (
        <div className="d-flex justify-content-center align-items-center h-100 mt-3">
            <RingLoader color='#00243D' height={250} width={250} visible={loading} />
        </div>
    )
}

export default Loading
