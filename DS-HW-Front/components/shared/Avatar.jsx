import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import NoAvatar from '../../public/img/no-avatar.png'
import { useUserImage } from '../../hooks/useUserImage';

const Avatar = ({ param, width, height, alt, status }) => {

    const { image } = useUserImage(param)

    return (
        <div className='avatar' style={{ width: `${width}`, height: `${height}` }}>
            <Image alt={`${alt}-avatar`} src={image ? image : NoAvatar} fill sizes="min-width:100px" />
        </div>
    )
}

export default Avatar