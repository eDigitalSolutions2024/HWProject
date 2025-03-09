import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import NoAvatar from '../../../public/img/no-avatar.png'
import { useMachineImage, useMachineTag } from '../../../hooks/useMachineImage';

const MachineImages = ({ param, width, height, alt }) => {

    const { image } = useMachineTag(param)

  return (
    <div className='machineImg' style={{ width: `${width}`, height: `${height}` }}>
            <Image alt={`${alt}`} src={image ? image : NoAvatar} fill sizes="min-width:100px" />
        </div>
  )
}

export default MachineImages