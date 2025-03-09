import React from 'react'

const DashboardsGeneralData = (props) => {
    const {data,title,icon, color='#ffd9a4'} = props;
    return (
        <div className="card dashboard-general-cards shadow w-100 p-0">
            <div className="card-body d-flex justify-content-center">
                <div className='d-flex justify-content-around flex-row align-items-center w-100' style={{gap: '1rem'}}>
                    <div  style={{background:color}} className='bg-icon-rounded text-center'>
                        <i className={`${icon} dashboard-icon`}></i>
                    </div>
                    <div className='d-flex flex-column justify-content-center text-center ms-xl-2'>
                        <div className=''><p >{title}</p></div>
                        <div><h2 >{data}</h2></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardsGeneralData
