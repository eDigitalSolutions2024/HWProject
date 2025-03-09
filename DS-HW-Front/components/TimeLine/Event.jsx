import React from 'react'

const Event = ({title, description, date}) => {
  return (
    <div className="event">
        <div className="event-date">{date}</div>
        <h4>{title}</h4>
        <div className="timeline-content">
          <p>
            {description}
          </p>
        </div>
      </div>
  )
}

export default Event