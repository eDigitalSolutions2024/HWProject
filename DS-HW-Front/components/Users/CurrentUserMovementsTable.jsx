import React from 'react'

const CurrentUserMovementsTable = () => {
  return (
    <div>
        <table className="table">
            <thead>
                <tr>
                    <th className='table-header'>Concepto</th>
                    <th className='table-header'>Tipo</th>
                    <th className='table-header'>Cantidad</th>
                    <th className='table-header'>Estado</th>
                    <th className='table-header'>Fecha</th>
                </tr>
            </thead>
            <tbody>
                {
                    attachments?.map((attachment, index) => (
                        <tr key={index}>
                            <td>{attachment.name}</td>
                            <td>{attachment.category}</td>
                            <td className='text-left'>{dayjs(attachment.date).format("DD/MM/YYYY HH:mm")}</td>
                            <td className='text-left'>{`${attachment.createdBy.firstName} ${attachment.createdBy.lastName}`}</td>
                            <td className='text-center font-size-icon-table' onClick={()=>downloadFile(attachment._id, `${attachment.name}.${attachment.fileType}`)}><i className="bi bi-download"></i></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default CurrentUserMovementsTable