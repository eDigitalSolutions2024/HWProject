import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import NoAvatar from '../../../public/img/no-avatar.png'
import { useMachineGuestImage } from '../../../hooks/useMachineImage';

const MachineGuestImages = ({ param, width, height, alt }) => {

    const { image } = useMachineGuestImage(param)

  return (
    <div className='machineImg img-fluid' style={{ width: `${width}`, height: `${height}` }}>
            <Image alt={`${alt}`} src={image ? image : NoAvatar} fill sizes="min-width:100px" />
        </div>
  )
}

export default MachineGuestImages