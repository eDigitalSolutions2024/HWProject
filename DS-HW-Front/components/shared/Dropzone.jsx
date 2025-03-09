import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const Dropzone = ({ title, multiple, onChange, className, icon }) => {
    const onDrop = acceptedFiles => {
        onChange(acceptedFiles)
    }  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
        <div {...getRootProps()} className={className + " dropzone"} >
            <input {...getInputProps()} multiple={multiple} />
            {
                isDragActive ?
                    (<>
                        <i className={icon + " dropzone-icon"}></i>
                        <p className={'text-center'} >Suelta los archivos aquí ...</p>
                    </>) :
                    (<>
                        <i className={icon + " dropzone-icon"}></i>
                        <p className={'text-center'} >{title}</p>
                    </>)
            }
        </div>
    )
}

export default Dropzone