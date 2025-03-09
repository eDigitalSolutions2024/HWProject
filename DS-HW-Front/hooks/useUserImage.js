import { useEffect, useState } from "react";
import { getUserImage } from "../api/users";

export const useUserImage = (param) => {
    const [image, setImage] = useState(null)
    useEffect(() => {
        if (param) {
            getUserImage(param)
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
