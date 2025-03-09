import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import FileDownload from 'js-file-download';
import { downloadAttachmentApi } from '../../api/utils';
import WarningModal from '@components/shared/WarningModal';
import { deleteUserAttachmentAction } from '@userActions'

const AttachmentTable = () => {
    const dispatch = useDispatch();
    const currentUserTab = useSelector(state => state.user).currentUserTab
    const { _id: userId } = useSelector(state => state.user.currentUser)
    const attachments = useSelector(state => state.user.currentUserAttachments)
    const [show, setShow] = useState(false)
    const [attachment, setAttachment] = useState({})

    const downloadFile = (id, name) => {
        downloadAttachmentApi(id)
            .then(response => {
                FileDownload(response, name);
            })
    }


    const deleteFile = async () => {
        console.log(attachment)
        await dispatch(deleteUserAttachmentAction(userId, attachment?._id));
    }

    return (
        <>

            <table className="table hover">
                <thead>
                    <tr>
                        <th className='table-header'>Nombre</th>
                        <th className='table-header'>Fecha</th>
                        <th className='table-header'>Subido por:</th>
                        <th className='table-header text-center'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        attachments?.map((attachment, index) => (
                            <tr key={index}>
                                <td>{attachment.name}</td>
                                <td className='text-left'>{dayjs(attachment.date).format("DD/MM/YYYY HH:mm")}</td>
                                <td className='text-left'>{`${attachment.createdBy.firstName} ${attachment.createdBy.lastName}`}</td>
                                <td className='text-center font-size-icon-table' >
                                    <button className="bi bi-download icon-button me-1" onClick={() => downloadFile(attachment._id, attachment.name)}></button >
                                    <button className="bi bi-trash-fill icon-button" onClick={() => { setAttachment(attachment); setShow(true) }}></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table >
            <WarningModal title={'Remover Archivo'} message={`Estas Seguro de remover el archivo "${attachment?.name}"`} show={show} setShow={setShow} action={deleteFile} />
        </>
    )
}

export default AttachmentTable