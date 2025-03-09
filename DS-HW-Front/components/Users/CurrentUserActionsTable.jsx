import React from 'react'
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

const CurrentUserActionsTable = () => {
    const actions = useSelector(state => state.user.currentUserTimeLineActions);
    const dotType = {
        CREATE: 'create-dot',
        UPDATE: 'update-dot',
        DELETE: 'delete-dot'
    }
    return (
        <table className="action-table table">
            <thead>
                <tr>
                    <th className='action-table_header_date'>Fecha</th>
                    <th className='action-table_header_type'>Tipo</th>
                    <th className='action-table_header_objetive'>Objetivo</th>
                    <th className='table-header'>Descripcion</th>
                </tr>
            </thead>
            <tbody>
                {
                    actions?.map((action, index) => (
                        <tr key={index}>
                            <td className='action-table_td_date'>{dayjs(action?.date).format("DD/MM/YYYY HH:mm")}</td>
                            <td className='action-table_td_type' > <span className={`${dotType[action.actionType]}`} /></td>
                            <td className='action-table_td_objetive'>{action?.target}</td>
                            <td>{action?.actionDescription}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default CurrentUserActionsTable