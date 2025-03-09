import React, { useState, useCallback, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { createNewUserAttachmentAction } from '@userActions';
import { useDropzone } from 'react-dropzone'

const DropFileUpload = ({ onChange, className, single, showFiles }) => {
    const dispatch = useDispatch();
    const [isDragZoneDisabled, setIsDragZoneDisabled] = useState(false)
    const [currentFiles, setCurrentFiles] = useState([])
    const onDrop = useCallback(acceptedFiles => {
        setCurrentFiles(previousFiles => [...previousFiles, ...acceptedFiles])
        onChange(single ? acceptedFiles[0] : acceptedFiles)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, disabled: isDragZoneDisabled })

    useEffect(() => {
        if (currentFiles.length >= 1 && single) {
            setIsDragZoneDisabled(true)
            setCurrentFiles(currentFiles[0])
        }
    }, [currentFiles])

    const fileIcons = (name) => {
        const ext = name?.split('.')?.pop();
        let icon = ''
        switch (ext) {
            case 'pdf':
                icon = 'bi bi-file-pdf-fill'
                break;
            case 'xlsx':
            case 'csv':
                icon = 'bi bi-file-excel-fill'
                break;
            case 'docx':
                icon = 'bi bi-file-word-fill'
                break;
            case 'jpg':
            case 'png':
                icon = 'bi bi-file-image-fill'
                break;
            default:
                icon = 'bi bi-file-fill'
                break;
        }
        return icon
    }

    return (
        <div>
            <div {...getRootProps({ className: `${isDragZoneDisabled ? 'file-input-inactive' : 'file-input-active'} ${isDragZoneDisabled ? '' : 'pointer'} ${className}` })} >
                <input {...getInputProps()} disabled={isDragZoneDisabled} />
                {
                    isDragActive
                        ? <InactiveDrop />
                        : isDragZoneDisabled ? <DisabledDrop /> : <ActiveDrop />
                }
            </div>
            {showFiles && (
                <div className='mt-3 mx-2'>
                    {currentFiles.map((file, index) => (
                        <div key={index} className='file-input-file-list row mt-1'>
                            <div className='d-flex align-items-center col'>
                                <span className={`${fileIcons(file?.name)} file-input-file-list_icon me-2`} />
                                {file?.name}
                                <span className='bi bi-x pointer ms-auto file-input-file-list_x-icon' />
                            </div>
                        </div>
                    ))}
                </div>

            )}
        </div>
    )
}

const ActiveDrop = () => (
    <div>
        <span className='bi bi-cloud-plus file-input-active_icon' />
    </div>
)

const InactiveDrop = () => (
    <div>
        <span className='bi bi-upload file-input-active_icon' />
    </div>
)

const DisabledDrop = () => (
    <div>
        <span className='bi bi-x-lg file-input-inactive_icon' />
    </div>
)

export default DropFileUpload