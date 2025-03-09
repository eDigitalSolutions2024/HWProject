import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Modal from '../components/shared/Modal'
import PropertyDocUpload from './../components/Property/PropertyDocUpload';
import { useEffect } from 'react';

export const useUpload = ({  }) => {
    const [files, setFiles] = useState([])
    const [show, setShow] = useState(false)

    const onSubmit = (callback) => callback(files)

    const DropzoneBox = ({ multiple, className, title, icon }) => {
        const onDrop = useCallback(acceptedFiles => {
            const docs = new Array();
            setShow(true)
            Array.from(acceptedFiles)?.map((x) => {
                var reader = new FileReader()
                var file = x

                reader.onload = e => {
                    if (file.type === 'image/jpeg' || file.type === 'image/png') {
                        docs = [...docs, { img: reader.result, name: file.name, data: file }]
                    }
                    else if (file.type === 'application/pdf') {
                        docs.push({ img: PDF, name: file.name, data: file })
                    }
                    else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                        docs.push({ img: envUrl + '/excel.png', name: file.name, data: file })
                    else {
                        docs.push({ img: envUrl + '/other.png', name: file.name, data: file })
                    }
                }
                reader.readAsDataURL(x)
            });
            setFiles(docs)
        }, [])
        const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

        return (
            <>
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
                <Modal title="Agregar Archivos" show={show} setShow={setShow}>
                    <PropertyDocUpload setShow={setShow} files={files} setFiles={setFiles} />
                </Modal>
            </>
        )
    }

    return {
        DropzoneBox,
        onSubmit
    }
}
