import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const GetServerImage = ({ apiMethod, param, layout, width, height, wrapperClassName = '', objectFit, show = false, alt, }) => {

    const [image, setImage] = useState('')

    useEffect(() => {
        if (show) {
            apiMethod(param)
                .then(response => {
                    const objectUrl = URL.createObjectURL(response);
                    setImage(objectUrl);
                })
                .catch(response => setImage(null))
        }
        // eslint-disable-next-line 
    }, [])

    return (
        <div className={`${wrapperClassName} position-relative`}>
            {(image && show) && (<Image alt={`${alt}-image`} src={image} layout={layout} objectFit={objectFit} width={width} height={height} />)}
        </div>
    )
}

export default GetServerImage