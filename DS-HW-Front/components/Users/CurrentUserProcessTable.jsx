import React from 'react'

const CurrentUserProcessTable = () => {
  return (
    <div>
        <table className="table">
            <thead>
                <tr>
                    <th className='table-header'>Nombre</th>
                    <th className='table-header'>Cliente</th>
                    <th className='table-header'>Fecha</th>
                    <th className='table-header'>status</th>
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
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default CurrentUserProcessTable