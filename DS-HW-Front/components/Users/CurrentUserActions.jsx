import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import NoDataFound from '@components/shared/NoDataFound';
import { getUserTimeLineActionsAction } from '@userActions';
import CurrentUserActionsTable from './CurrentUserActionsTable';
import CurrentUserActionsHeader from './CurrentUserActionsHeader';
import Loading from '@components/shared/Loading';

const CurrentUserActions = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);
    const actions = useSelector(state => state.user.currentUserTimeLineActions);
    const isLoading = useSelector(state => state.user.isLoadingCurrentUserTimeLineActions);

    const [page, setPage] = useState(1)
    const [description, setDescription] = useState('')
    const [actionType, setActionType] = useState('')
    const [target, setTarget] = useState('')
    const [endDate, setEndDate] = useState('')
    const [startDate, setStartDate] = useState('')

    useEffect(() => {
        dispatch(getUserTimeLineActionsAction(user._id, page, target, description, startDate, endDate, actionType))
    }, [user, page, description, actionType, target, endDate, startDate])

    return (
        <div>

            <div className='mt-5 d-flex flex-column card shadow '>
                <div className='mb-5'>
                    <CurrentUserActionsHeader page={page} setPage={setPage} setDescription={setDescription} setActionType={setActionType} setTarget={setTarget} setEndDate={setEndDate} setStartDate={setStartDate} />
                </div>
                {
                    isLoading
                        ? <Loading />
                        : actions.length > 0 ? <CurrentUserActionsTable /> : <NoDataFound className="mt-5" />
                }
                { }
            </div>
        </div>
    )
}

export default CurrentUserActions