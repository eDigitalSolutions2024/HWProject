import React,{useState, useEffect} from 'react'
import Paginator from '../shared/Paginator';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getTimeLineListAction } from '../../store/actions/timeLineActions';

const TimeLineHeader = () => {
  const dispatch = useDispatch();
  const totalItems = useSelector(state => state.timeLine.total)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getTimeLineListAction(page));
    // eslint-disable-next-line 
  }, [page])
  

  return (
    <div className='mb-4'>
        <div className='d-flex flex-between justify-content-center align-items-center'>
            <div className='d-flex flex-between'>
                <h2><b></b>Historial de Movimientos</h2>
            </div>
            <div className='d-flex flex-between me-5'>
              <Paginator totalItems={totalItems} page={page} setPage={setPage} />
            </div>                
        </div>
    </div>
  )
}

export default TimeLineHeader