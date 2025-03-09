import { useEffect, useState } from "react";
import { getMachineImage, getMachineTag, getMachineImageNoAuth, getMachineTagNoAuth } from "../api/machine";

export const useMachineImage = (param) => {
    const [image, setImage] = useState(null)
    useEffect(() => {
        if (param) {
            getMachineImage(param)
                .then(response => {
                    const objectUrl = URL.createObjectURL(response);
                    setImage(objectUrl);
                })
                .catch(response => setImage(null))
        }

        // eslint-disable-next-line
    }, [param])

    return { image }
}

// no-auth
export const useMachineGuestImage = (param) => {
    const [image, setImage] = useState(null)
    useEffect(() => {
        if (param) {
            getMachineImageNoAuth(param)
                .then(response => {
                    const objectUrl = URL.createObjectURL(response);
                    setImage(objectUrl);
                })
                .catch(response => setImage(null))
        }

        // eslint-disable-next-line
    }, [param])

    return { image }
}

export const useMachineTag = (param) => {
    const [image, setImage] = useState(null)
    useEffect(() => {
        if (param) {
            getMachineTag(param)
                .then(response => {
                    const objectUrl = URL.createObjectURL(response);
                    setImage(objectUrl);
                })
                .catch(response => setImage(null))
        }

        // eslint-disable-next-line
    }, [param])

    return { image }
}

// no-auth
export const useMachineGuestTag = (param) => {
    const [image, setImage] = useState(null)
    useEffect(() => {
        if (param) {
            getMachineTagNoAuth(param)
                .then(response => {
                    const objectUrl = URL.createObjectURL(response);
                    setImage(objectUrl);
                })
                .catch(response => setImage(null))
        }

        // eslint-disable-next-line
    }, [param])

    return { image }
}