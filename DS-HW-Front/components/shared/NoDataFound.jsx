import React from 'react'

const NoDataFound = ({ h, quote, icon, iconSize, className }) => {
  return (
    <div className={`d-flex align-items-center justify-content-center ${className}`}>
      <span className={`${h ? h : "h1"} text-center`}>{quote ? quote : "No Se Encontró Información"}</span><i style={{ fontSize: `${iconSize ? iconSize : "60px"}`, fontWeight: "bold" }} className={icon ? `${icon} ms-5` : `bi bi-emoji-frown ms-5`}></i>
    </div>
  )
}

export default NoDataFound