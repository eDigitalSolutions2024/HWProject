import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { removeToken } from '@Utilities/token';
import { setUserAuthData } from '@store/slices/userSlices';

export default function NavBar() {
    const auth = useSelector(state => state.user.authUser)
    const router = useRouter()
    const dispatch = useDispatch()
    const logout = async () => {
        if (auth) {
            await removeToken();
            dispatch(setUserAuthData({}))
            router.push('/login');
        }
    }
    const collapseNavBar = () => {
        var sidebar = document.querySelector("#sidebar")
        var container = document.querySelector('.admin-content')
        var items = document.querySelector('.toggler-menu')

        sidebar.classList.toggle("active-menu")
        container.classList.toggle("active-content")
        items.classList.toggle("active-toggler-menu")
    }
    return (
        <div className='NavbarComponent'>
            <nav className="navbar navbar-expand-md d-flex flex-column" id="sidebar">
                <div className='d-flex flex-row navbar-info px-3 mt-2'>
                    <div className='d-flex align-items-center'>
                        <Link href='/' passHref >
                            <div className='d-md-flex flex-md-column align-items-center'>
                                {/* <div className='position-image'>
                                    <Image alt="logo" className='logo-style' src="/favicon.ico" fill sizes="" />
                                </div> */}
                                <span className="text-light mt-3 name-user">{auth?.role?.role}</span>
                            </div>
                        </Link>
                    </div>
                    <button type='button' className='btn header-button' id="collapse-button" onClick={collapseNavBar}>
                        <i className="bi bi-list"></i>
                    </button>
                </div>
                <hr className="border w-100" />
                <div className='navbar-container mt-2 w-100'>
                    <ul className='navbar-nav d-flex flex-column toggler-menu'>
                        <NavItem text={'Dashboards'} route={'/'} icon={'bi bi-clipboard-data'} />
                        {/* {auth?.role?.readPermissions.includes('customers') || auth?.role?.role === "ADMIN_ROLE" ? <NavItem text={'Clientes'} route={'/customers'} icon={'bi bi-person-badge'} /> : null} */}
                        {auth?.role?.readPermissions.includes('users') || auth?.role?.role === "ADMIN_ROLE" ? <NavItem text={'Usuarios'} route={'/users'} icon={'bi bi-person'} /> : null}
                        {/* {auth?.role?.readPermissions.includes('roles') || auth?.role?.role === "ADMIN_ROLE" ? <NavItem text={'Roles'} route={'/roles'} icon={'bi bi-person-lines-fill'} /> : null} */}
                        {/* {auth?.role?.readPermissions.includes('events') && (<NavItem text={'Linea de Eventos'} route={'/events'} icon={'bi bi-calendar-week'} />)} */}
                        {auth?.role?.readPermissions.includes('timeLine') || auth?.role?.role === "ADMIN_ROLE" ? <NavItem text={'Maquinas totales'} route={'/machine'} icon={'bi bi-calendar-range'} /> : null}
                        <li className='nav-item w-100' onClick={() => logout()} style={{ cursor: 'pointer' }}>
                            <a className='nav-link text-light item-option'>
                                <i className="bi bi-box-arrow-left mx-3"></i>
                                Cerrar Sesión
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

        </div>
    )
}

const NavItem = (props) => {
    const router = useRouter();
    const [pathHover, setPathHover] = useState('')
    const { text, route, query, icon, children } = props;

    useEffect(() => {
        setPathHover(router.pathname === route ? 'hover' : '')
    }, [route, router])


    return (
        <div>
            <li className='nav-item w-100' style={{ overflow: 'hidden' }}>
                <Link className={`nav-link text-light item-option ${pathHover}`} href={query ? { pathname: route, query: { type: query } } : { pathname: route }}>
                    <i className={`${icon} mx-3`}></i>
                    {text}
                </Link>
                {children}
            </li>
        </div>
    )
}

const NavDropdown = (props) => {
    const router = useRouter();
    const [pathHover, setPathHover] = useState('')
    const [show, setShow] = useState(false)
    const { text, children, route } = props;

    const pathName = usePathname()

    useEffect(() => {
        if (pathName.includes(route)) {
            setPathHover('hover')
            setShow(true)
        }
        else setPathHover('')
    }, [route, router, show])

    return (
        <div>
            <li className='nav-item w-100 ' style={{ overflow: 'hidden' }}>
                <button type='button' className={`nav-link text-light list__button--click item-option border-0 bg-transparent ${pathHover}`} onClick={() => setShow(!show)}>
                    <i className={`bi bi-book-half mx-3`}></i>
                    {text}
                    <i className={`bi bi-caret-right-fill ms-auto ${show && 'rotate-90'}`}></i>
                </button>
                <ul className={`list__show ${show && 'h-fit'}`}>
                    {children}
                </ul>
            </li>
        </div>
    )
}

const SubNavItem = (props) => {
    const router = useRouter();
    const [pathHover, setPathHover] = useState('')
    const { text, route, icon, query = '' } = props;

    useEffect(() => {
        if (router.pathname === route && query.includes(router.query.type ?? '')) {
            setPathHover('hover')
        }
        else setPathHover('')
    }, [route, router, query])

    return (
        <li className='nav-item w-100' style={{ borderLeft: 'solid 2px white', listStyle: 'none' }}>
            <Link className={`nav-link text-light item-option ${pathHover}`} href={query != '' ? { pathname: route, query: { type: query } } : { pathname: route }}>
                <i className={`${icon} mx-3`}></i>
                {text}
            </Link>
        </li>
    )
}