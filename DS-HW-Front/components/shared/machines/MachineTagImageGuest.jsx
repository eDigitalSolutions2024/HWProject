import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import NoAvatar from '../../../public/img/no-avatar.png'
import { useMachineImage, useMachineGuestTag } from '../../../hooks/useMachineImage';

const MachineGuestTagImage = ({ param, width, height, alt }) => {

    const { image } = useMachineGuestTag(param)

  return (
    <div className='machineImg img-fluid' style={{ width: `${width}`, height: `${height}` }}>
            <Image alt={`${alt}`} src={image ? image : NoAvatar} fill sizes="min-width:100px" />
        </div>
  )
}

export default MachineGuestTagImage