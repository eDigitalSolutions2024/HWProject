import React, { useEffect } from 'react';
import Image from 'next/image'
import { getUserImage } from '../../api/users';
import Avatar from '../shared/Avatar'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRefModal } from './../../hooks/useRefModal';
import Link from 'next/link';
import { removeToken } from '@Utilities/token';
import { setUserAuthData } from '@store/slices/userSlices';
import { useSelector, useDispatch } from 'react-redux'

export default function Header() {
    const dispatch = useDispatch();
    const router = useRouter();
    const auth = useSelector(state => state.user.authUser)
    const user = useSelector(state => state.user.currentUser)
    const Name = auth?.firstName + ' ' + auth?.lastName;
    const [show, setshow] = useState(false)

    const toggleClass = () => {
        const navbar = document.querySelector(".NavbarComponent");
        const background = document.querySelector(".admin-layout");
        const header = document.querySelector(".nav-items");

        navbar.classList.toggle("active")
        background.classList.toggle("active")
        header.classList.toggle("active")

    }

    const logout = async () => {
        if (auth) {
            await removeToken();
            dispatch(setUserAuthData({}))
            router.push('/login');
        }
    }
    return (
        <header className='nav-header'>
            <div className='h-100 flex-between align-items-center nav-items'>
                <div className='menu-list' onClick={toggleClass}>
                    <i className="bi bi-list"></i>
                </div>
                <button type={'button'} className='nav-header_avatar flex-between border-0 bg-transparent' onClick={() => setshow(!show)}>
                    <div className='my-auto'>
                        <span className='text-white me-2'>{Name}</span>
                    </div>
                    {/* <div className='my-auto pointer me-2'>
                        <Avatar param={user ? user.idUser : null} width={'40px'} height={'40px'} />
                    </div> */}
                    <i className='fa-solid fa-chevron-down text-white my-auto'></i>

                    <ProfileBox show={show} setshow={setshow} logout={logout} auth={auth} />
                </button>
            </div>
        </header>
    );
}

export const ProfileBox = ({ show, setshow, logout, auth }) => {
    const ref = useRefModal(() => setshow(false))
    const Name = auth?.firstName + ' ' + auth?.lastName;
    return (
        <div ref={ref} className={show ? "menu-pop active bg-secondary" : "menu-pop bg-secondary"}>
            {/* <Link href={`/users/${auth?.idUser}`} passHref >
                <div className='profile_info'>
                    <Avatar param={auth ? auth.idUser : null} width={'50px'} height={'50px'} />
                    <span className='text-white text-start flex-wrap' >{Name}</span>
                </div>
            </Link> */}
            <hr className='text-white' />
            <ul className='navbar-nav d-flex flex-column text-start'>
                {/* <li className='nav-item w-100 pointer'>
                    <Link href={`/users/${auth?.idUser}`} passHref >
                        <div className='nav-link nav-link-span text-light item-option'>
                            <i className="fa-solid fa-user-lock mx-3" style={{ height: '16px', width: '16px' }}></i>
                            Tu Información
                        </div>
                    </Link>
                </li> */}
                <li className='nav-item w-100 pointer' onClick={() => logout()} >
                    <a className='nav-link nav-link-span text-light item-option'>
                        <i className="bi bi-box-arrow-left mx-3" style={{ height: '16px', width: '16px' }}></i>
                        Cerrar Sesión
                    </a>
                </li>
            </ul>
        </div>
    )
}

