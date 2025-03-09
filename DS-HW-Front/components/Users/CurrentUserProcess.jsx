import React from 'react'
import CurrentUserProcessTable from './CurrentUserProcessTable';
import NoDataFound from '../shared/NoDataFound';
const CurrentUserProcess = () => {
  return (
    <div className='mt-5'>
      <div className='pt-5'>
        <NoDataFound className="mt-5" />
      </div>
    </div>
  )
}

export default CurrentUserProcess