import React from 'react'
import TimeLineContainer from './TimeLineContainer'
import Event from './Event'
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import Loading from '../shared/Loading';
//Redux
import { useDispatch, useSelector } from 'react-redux';

const TimeLineStructure = () => {

  const timeLineList = useSelector(state => state.timeLine.list)
  const isLoading = useSelector(state => state.timeLine.loading)
  return (
    <div>
      {
        !isLoading
          ? (
            <TimeLineContainer>
              {
                timeLineList?.map((record, key) => <Event key={key} date={dayjs(record.date).locale('es').format('DD MMMM YYYY')} description={`${record.actionDescription} por ${record?.actionBy?.firstName} ${record?.actionBy?.lastName}`} title={record.actionTitle} />)
              }
            </TimeLineContainer>
          )
          : <Loading />
      }

    </div>
  )
}

export default TimeLineStructure